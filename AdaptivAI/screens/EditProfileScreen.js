import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import GradientButton from "../components/buttons/GradientButton";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import { useError } from "../contexts/ErrorContext";
import { useTheme } from "../contexts/ThemeContext";
import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker"; // Import Image Picker

export default function EditProfileScreen() {
  const { user, fetchUserProfile } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const { showError } = useError();
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const [image, setImage] = useState(user.imageUrl); // Simpan URL gambar

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

  const handleSave = async () => {
    try {
      startLoading();

      // Buat FormData untuk mengirim file gambar
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);

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

      // Kirim request dengan FormData
      const response = await axios({
        method: "PUT",
        url: "/api/users/" + user._id,
        data: formData,  // Gunakan 'data' bukan 'formData'
        headers: {
          'Content-Type': 'multipart/form-data',  // Header yang benar
        },
      });

      await fetchUserProfile();
      navigation.replace("Dashboard", { screen: "Profile" });
    } catch (err) {
      console.log(err);
      showError("Failed to update profile");
    } finally {
      stopLoading();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={{ flex: 1, marginTop: 20, width: "100%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginHorizontal: 25,
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontFamily: theme.fonts.regular,
              fontSize: 16,
              fontWeight: "bold",
              color: "#FBA459",
              textAlign: "center",
            }}
          >
            PROFILE
          </Text>

          {/* Profile Picture */}
          <TouchableOpacity
            onPress={pickImage}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <View>
              <Image
                source={{
                  uri: image,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
              />
              <View
                style={{
                  position: "absolute",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 50,
                  width: 36,
                  height: 36,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  right: 0,
                }}
              >
                <Ionicons
                  name="add-circle"
                  size={35}
                  color="#FBA459"
                  style={{
                    position: "absolute",
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>

          {/* Username */}
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 30 }}
          >
            <Ionicons name="person-circle-outline" size={32} color="#FFFFFF" />
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 10,
                borderBottomWidth: 1,
                borderBlockColor: "#FFFFFF",
                width: "80%",
              }}
            >
              <Text
                style={{
                  color: theme.text,
                  fontFamily: theme.fonts.regular,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#FFFFFF",

                  marginTop: 6,
                }}
              >
                Username
              </Text>
              <TextInput
                style={{
                  color: theme.text,
                  fontFamily: theme.fonts.regular,
                  fontSize: 14,
                  color: "rgba(255, 255, 255, 0.5)",
                  height: 42,
                }}
                onChangeText={(text) => setUsername(text)}
                value={username}
              />
            </View>
          </View>

          {/* Email */}
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 30 }}
          >
            <Ionicons name="mail-outline" size={32} color="#FFFFFF" />
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 10,
                borderBottomWidth: 1,
                borderBlockColor: "#FFFFFF",
                width: "80%",
              }}
            >
              <Text
                style={{
                  color: theme.text,
                  fontFamily: theme.fonts.regular,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#FFFFFF",

                  marginTop: 6,
                }}
              >
                Email
              </Text>
              <TextInput
                style={{
                  color: theme.text,
                  fontFamily: theme.fonts.regular,
                  fontSize: 14,
                  color: "rgba(255, 255, 255, 0.5)",
                  height: 42,
                }}
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>
          </View>

          <View style={{ height: 50, marginTop: 40 }}>
            <GradientButton text={"SAVE"} onPress={() => handleSave()} />
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
