import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import GradientButton from "../components/buttons/GradientButton";

import { useTheme } from "../contexts/ThemeContext";
import { useDiscussions } from "../contexts/DiscussionContext";
import { useLoading } from "../contexts/LoadingContext";
import { useError } from "../contexts/ErrorContext";
import { useState } from "react";
import axios from "../config/axiosInstance";
import * as ImagePicker from "expo-image-picker"; // Import Image Picker
import { useNavigation } from "@react-navigation/native";

export default function StartDiscussionScreen() {
  const { theme } = useTheme();
  const { createDiscussion } = useDiscussions();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showError } = useError();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigation = useNavigation();

    // 📌 Fungsi untuk memilih gambar dari galeri
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

  async function handleCreateDiscussion() {
    try {
      startLoading();

      // Buat FormData untuk mengirim file gambar
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      // Tambahkan gambar hanya jika ada perubahan
      if (image && image !== user.imageUrl) {
        // Get file extension from uri
        const uriParts = image.split('.');
        const fileType = uriParts[uriParts.length - 1];

        // Create file object for FormData
        formData.append("image", {
          uri: image,
          name: `profile.${fileType}`,
          type: `image/${fileType}`
        });
      }

      await axios({
        method: "POST",
        url: "/api/discussions",
        data: formData,  // Gunakan 'data' bukan 'formData'
        headers: {
          'Content-Type': 'multipart/form-data',  // Header yang benar
        },
      });
    } catch (err) {
      Alert.alert("Error", err.response.data.message);
    }
  }

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
            Upload Image
          </Text>
          <TouchableOpacity
          onPress={pickImage}
            style={{
              width: "100%",
              height: 120,
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 12,
              backgroundColor: "#303030",
              borderRadius: 12,
              borderWidth: 2,
              borderColor: "#FFFFFF",
              gap: 2,
              alignItems: "center",
            }}
          >
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
            Title
          </Text>

          <TextInput
            style={{
              width: "100%",
              padding: 12,
              height: 50,
              backgroundColor: "#303030",
              borderRadius: 12,
              borderWidth: 2,
              borderColor: "#FFFFFF",
              color: "#FFFFFF",
              textAlign: "left",
              textAlignVertical: "top",
            }}
            onChangeText={(text) => setTitle(text)}
            value={title}
            placeholder="Write your title"
          />

          <Text
            style={{
              textAlign: "left",
              fontFamily: theme.fonts.bold,
              color: theme.text,
              fontSize: 18,
              marginVertical: 10,
            }}
          >
            Content
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
            defaultValue="Write your questions"
            multiline={true}
            onChangeText={(text) => setContent(text)}
            value={content}
            placeholder="Write your content"
          />

          <View
            style={{
              width: "100%",
              height: 50,
              marginTop: 20,
            }}
          >
            <GradientButton
              text={"START DISCUSSION"}
              onPress={() => handleCreateDiscussion()}
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
    alignItems: "center",
    justifyContent: "center",
    color: "#FFFFFF",
  },
});
