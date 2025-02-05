import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import GradientButton from "../components/buttons/GradientButton";

import { useTheme } from "../contexts/ThemeContext";
import { useModules } from "../contexts/ModuleContext";
import { useLoading } from "../contexts/LoadingContext";
import { useError } from "../contexts/ErrorContext";
import axios from "../config/axiosInstance";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker"; // Import Image Picker
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";

export default function GenerateModuleScreen() {
  const { theme } = useTheme();
  const { createModule } = useModules();
  const { startLoading, stopLoading } = useLoading();
  const { showError } = useError();
  const navigation = useNavigation();

  const [pdf, setPdf] = useState(null);
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [AdditionalNotes, setAdditionalNotes] = useState("");

  // 📌 Fungsi untuk memilih gambar dari galeri
  const pickPdfFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      console.log(result);
      if (result.type === "success") {
        setPdf(result);
        console.log("File selected: ", result);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canceled file selection");
      } else {
        console.error("Unknown error: ", err);
      }
    }

    if (!pdf) {
      Alert.alert("Error", "Please select a PDF file");
    }

    const handleSubmit = async () => {
      startLoading();

      // Buat FormData untuk mengirim file gambar
      const formData = new FormData();
      formData.append("preferredLanguage", preferredLanguage);
      formData.append("AdditionalNotes", AdditionalNotes);

      // Tambahkan file ke FormData
      formData.append("file", {
        uri: pdfFile[0].uri,
        name: pdfFile[0].name,
        type: pdfFile[0].type,
      });
      try {
        // Kirim request dengan FormData
        const response = await axios({
          method: "POST",
          url: "/api/modules/",
          data: formData, // Gunakan 'data' bukan 'formData'
          headers: {
            "Content-Type": "multipart/form-data", // Header yang benar
          },
        });

        await fetchUserProfile();
        navigation.replace("Dashboard");
      } catch (err) {
        console.log(err);
        showError("Failed to generate module");
      } finally {
        stopLoading();
      }
    };
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={{ width: "100%", height: "100%" }}>
        <View style={{ flex: 1, marginTop: 60, marginHorizontal: 25 }}>
          <Text
            style={{
              textAlign: "left",
              fontFamily: theme.fonts.bold,
              color: theme.text,
              fontSize: 18,
            }}
          >
            Input File
          </Text>
          <TouchableOpacity
          title="Select PDF"
            onPress={pickPdfFile}
            style={{
              width: "100%",
              height: 120,
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              padding: 12,
              backgroundColor: "#303030",
              borderRadius: 12,
              borderWidth: 2,
              borderColor: "#FFFFFF",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: theme.fonts.regular,
                fontSize: 14,
                color: "rgba(255,255,255,0.25)",
                textAlign: "left",
                width: "100%",
              }}
            >
              PDF File Max 20MB
            </Text>
            <Ionicons
              name="add-circle-sharp"
              size={45}
              color="#716AD8"
              style={{ justifyContent: "center" }}
            />
          </TouchableOpacity>

          <Text
            style={{
              textAlign: "left",
              fontFamily: theme.fonts.bold,
              color: theme.text,
              fontSize: 18,
              marginTop: 20,
              marginBottom: 6,
            }}
          >
            Language
          </Text>

          <View
            style={{
              width: "100%",
              marginTop: 10,
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              borderWidth: 2,
              borderColor: "rgba(100,100,100,0.8)",
            }}
          >
            <Picker>
              <Picker.Item
                label="Bahasa Indonesia"
                value="id"
                themeVariant={"light"}
                onPress={() => setPreferredLanguage(value)}
              />
              <Picker.Item label="English" value="en" />
            </Picker>
          </View>

          <Text
            style={{
              textAlign: "left",
              fontFamily: theme.fonts.bold,
              color: theme.text,
              fontSize: 18,
              marginVertical: 10,
            }}
          >
            Additional Notes
          </Text>

          <TextInput
            style={{
              width: "100%",
              height: 150,
              padding: 12,
              backgroundColor: "#303030",
              borderRadius: 12,
              borderWidth: 2,
              borderColor: "#FFFFFF",
              color: "#FFFFFF",
              textAlign: "left",
              textAlignVertical: "top",
            }}
            defaultValue="Input additional notes"
            multiline={true}
            placeholder="Input additional notes"
            onChangeText={(text) => setAdditionalNotes(text)}
            value={AdditionalNotes}
          />

          <View
            style={{
              width: "100%",
              height: 50,
              marginTop: 20,
            }}
          >
            <GradientButton text={"GENERATE"} onPress={() => handleSubmit()}/>
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
    alignItems: "center",
    justifyContent: "center",
    color: "#FFFFFF",
  },
});
