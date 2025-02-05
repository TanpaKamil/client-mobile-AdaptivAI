import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import GradientButton from "../components/buttons/GradientButton";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import { useError } from "../contexts/ErrorContext";
import { useTheme } from "../contexts/ThemeContext";

export default function EditProfileScreen() {
  const { user, fetchUserProfile } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const { showError } = useError();
  const { theme } = useTheme();

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
                  uri: `https://image.pollinations.ai/prompt/personprofilepicture?width=200&height=320&nologo=true`,
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
                  right: 0
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
              >
                username
              </TextInput>
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
              >
                user@mail.com
              </TextInput>
            </View>
          </View>

          {/* Password */}
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 30 }}
          >
            <Ionicons name="lock-closed-outline" size={32} color="#FFFFFF" />
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
                Password
              </Text>
              <TextInput
                style={{
                  color: theme.text,
                  fontFamily: theme.fonts.regular,
                  fontSize: 14,
                  color: "rgba(255, 255, 255, 0.5)",
                  height: 42,
                }}
              >
                *******
              </TextInput>
            </View>
          </View>

          <View style={{ height: 50, marginTop: 40 }}>
            <GradientButton text={"EDIT PROFILE"} />
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
