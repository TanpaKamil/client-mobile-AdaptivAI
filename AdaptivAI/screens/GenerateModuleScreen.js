import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import GradientButton from '../components/buttons/GradientButton';
import { useTheme } from '../contexts/ThemeContext';
import { useModules } from '../contexts/ModuleContext';
import { useLoading } from '../contexts/LoadingContext';
import { useError } from '../contexts/ErrorContext';
import axios from '../config/axiosInstance';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default function GenerateModuleScreen() {
  const { theme } = useTheme();
  const { createModule } = useModules();
  const { startLoading, stopLoading } = useLoading();
  const { showError } = useError();
  const navigation = useNavigation();

  const [pdf, setPdf] = useState(null);
  const [preferredLanguage, setPreferredLanguage] = useState('en');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const validateFile = (file) => {
    // Check file size (20MB = 20 * 1024 * 1024 bytes)
    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('File size exceeds 20MB limit');
    }

    // Verify file type
    const validTypes = ['application/pdf'];
    if (!validTypes.includes(file.mimeType)) {
      throw new Error('Invalid file type. Please select a PDF file');
    }

    return true;
  };

  const pickPdfFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const file = result.assets[0];
        
        try {
          validateFile(file);
          setPdf(file);
          console.log('PDF selected successfully:', {
            name: file.name,
            size: file.size,
            uri: file.uri,
            mimeType: file.mimeType
          });
        } catch (validationError) {
          Alert.alert('Error', validationError.message);
          setPdf(null);
        }
      }
    } catch (err) {
      console.error('Error picking PDF:', err);
      Alert.alert('Error', 'Failed to select PDF file');
    }
  };

  const prepareFileForUpload = async (fileUri) => {
    if (Platform.OS === 'android') {
      // For Android, we need to read the file as base64 and convert it
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64
      });
      return `data:application/pdf;base64,${base64}`;
    }
    return fileUri; // iOS can use the file URI directly
  };

  const handleSubmit = async () => {
    if (!pdf) {
      Alert.alert('Error', 'Please select a PDF file');
      return;
    }

    startLoading();

    try {
      const formData = new FormData();
      
      // Prepare the file for upload based on platform
      const fileUri = await prepareFileForUpload(pdf.uri);
      
      const fileToUpload = {
        uri: fileUri,
        type: 'application/pdf',
        name: pdf.name || 'document.pdf'
      };

      // Append file and other fields to FormData
      formData.append('pdf', fileToUpload);
      formData.append('language', preferredLanguage);
      formData.append('notes', additionalNotes);

      // Set specific headers for multipart/form-data
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json'
        },
        transformRequest: (data, headers) => {
          // Don't transform the data
          return data;
        },
      };

      const response = await axios.post('/api/modules/', formData, config);
      
      if (response.data) {
        console.log('Upload successful:', response.data);
        // Optionally update local state through context
        if (createModule) {
          await createModule(response.data);
        }
        navigation.replace('Dashboard');
      }
    } catch (err) {
      console.error('Upload error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to generate module';
      showError(errorMessage);
    } finally {
      stopLoading();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Input File
          </Text>
          
          <TouchableOpacity
            onPress={pickPdfFile}
            style={styles.uploadButton}
            activeOpacity={0.8}
          >
            <View style={styles.uploadContent}>
              <View style={styles.uploadIconContainer}>
                {pdf ? (
                  <Ionicons
                    name="document-text"
                    size={40}
                    color="#716AD8"
                  />
                ) : (
                  <Ionicons
                    name="cloud-upload"
                    size={40}
                    color="#716AD8"
                  />
                )}
              </View>
              
              <View style={styles.uploadTextContainer}>
                {pdf ? (
                  <>
                    <Text style={styles.selectedFileName} numberOfLines={1}>
                      {pdf.name}
                    </Text>
                    <Text style={styles.uploadText}>
                      {(pdf.size / (1024 * 1024)).toFixed(2)} MB • Tap to change
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.uploadTitle}>
                      Choose PDF File
                    </Text>
                    <Text style={styles.uploadText}>
                      Tap to upload • Max 20MB
                    </Text>
                  </>
                )}
              </View>

              <View style={styles.uploadStatusIcon}>
                {pdf ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color="#4CAF50"
                  />
                ) : (
                  <Ionicons
                    name="add-circle"
                    size={24}
                    color="#716AD8"
                  />
                )}
              </View>
            </View>

            {pdf && (
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
            )}
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Language
          </Text>
          
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={preferredLanguage}
              onValueChange={setPreferredLanguage}
              style={styles.picker}
            >
              <Picker.Item label="Bahasa Indonesia" value="id" />
              <Picker.Item label="English" value="en" />
            </Picker>
          </View>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Additional Notes
          </Text>
          
          <TextInput
            style={styles.notesInput}
            placeholder="Input additional notes"
            placeholderTextColor="rgba(255,255,255,0.5)"
            onChangeText={setAdditionalNotes}
            value={additionalNotes}
            multiline
          />

          <View style={styles.buttonContainer}>
            <GradientButton 
              text="GENERATE"
              onPress={handleSubmit}
              disabled={!pdf}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    flex: 1,
    marginTop: 60,
    marginHorizontal: 25,
  },
  sectionTitle: {
    textAlign: 'left',
    fontSize: 18,
    marginVertical: 10,
  },
  uploadButton: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#716AD8',
    overflow: 'hidden',
  },
  uploadContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  uploadIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: 'rgba(113, 106, 216, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  uploadText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
  },
  selectedFileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  uploadStatusIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(113, 106, 216, 0.2)',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    width: '100%',
    backgroundColor: '#716AD8',
  },
  pickerContainer: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(100,100,100,0.8)',
  },
  picker: {
    width: '100%',
  },
  notesInput: {
    width: '100%',
    height: 150,
    padding: 12,
    backgroundColor: '#303030',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    marginTop: 20,
  },
});