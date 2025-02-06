import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import GradientButton from "../components/buttons/GradientButton";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useDiscussions } from "../contexts/DiscussionContext";
import { useLoading } from "../contexts/LoadingContext";
import { useError } from "../contexts/ErrorContext";
import { useNavigation } from "@react-navigation/native";
import axios from "../config/axiosInstance";

export default function StartDiscussionScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { startLoading, stopLoading } = useLoading();
  const { showError } = useError();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  // Request permission for image picking
  async function requestMediaLibraryPermission() {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        showError('Sorry, we need camera roll permissions to upload images!');
        return false;
      }
      return true;
    }
    return true;
  }

  // Handle image picking
  async function handleImagePick() {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0]);
      }
    } catch (error) {
      showError('Error picking image');
      console.error('Image pick error:', error);
    }
  }

  // Handle form submission
  async function handleSubmit() {
    try {
      // Validate inputs
      if (!title.trim() || !content.trim()) {
        showError('Title and content are required');
        return;
      }

      startLoading();

      // Create form data
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('content', content.trim());

      // Add image if selected
      if (image) {
        // Get file extension from URI
        const uriParts = image.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];

        formData.append('image', {
          uri: image.uri,
          name: `discussion-image.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      // Submit the form
      await axios.post('/api/discussions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Navigate back on success
      navigation.goBack();

    } catch (error) {
      showError(error.message || 'Failed to create discussion');
      console.error('Submit error:', error);
    } finally {
      stopLoading();
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          {/* Image Upload Section */}
          <Text style={[styles.label, { color: theme.text }]}>
            Upload Image
          </Text>
          <TouchableOpacity
            style={styles.imageUpload}
            onPress={handleImagePick}
          >
            {image ? (
              <Image
                source={{ uri: image.uri }}
                style={styles.previewImage}
              />
            ) : (
              <Ionicons
                name="add-circle-sharp"
                size={45}
                color="#716AD8"
              />
            )}
          </TouchableOpacity>

          {/* Title Input */}
          <Text style={[styles.label, { color: theme.text }]}>
            Title
          </Text>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Input Title"
            placeholderTextColor="#999"
          />

          {/* Content Input */}
          <Text style={[styles.label, { color: theme.text }]}>
            Content
          </Text>
          <TextInput
            style={styles.contentInput}
            value={content}
            onChangeText={setContent}
            placeholder="Write your questions"
            placeholderTextColor="#999"
            multiline={true}
            onChangeText={(text) => setContent(text)}
            value={content}
            placeholder="Write your content"
          />

          {/* Submit Button */}
          <View style={styles.buttonContainer}>
            <GradientButton
              text="START DISCUSSION"
              onPress={handleSubmit}
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
    backgroundColor: "#fff",
  },
  wrapper: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    marginTop: 60,
    marginHorizontal: 25,
  },
  label: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  imageUpload: {
    width: "100%",
    height: 120,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#303030",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    overflow: 'hidden',
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  titleInput: {
    width: "100%",
    padding: 12,
    height: 50,
    backgroundColor: "#303030",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  contentInput: {
    width: "100%",
    height: 150,
    padding: 12,
    backgroundColor: "#303030",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    color: "#FFFFFF",
    textAlignVertical: "top",
    marginBottom: 20,
  },
  buttonContainer: {
    height: 50,
  },
});