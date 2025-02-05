import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import GradientButton from "../components/buttons/GradientButton";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/buttons/Button";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import * as SecureStore from "expo-secure-store";

export default function ProfileScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const {setIsLogin} = useContext(AuthContext);

  async function handleLogout() {
    setIsLogin(false);
    await SecureStore.deleteItemAsync("access_token");
  }
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={{ flex: 1, marginTop: 20, width: "100%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginHorizontal: 25,
            marginTop: 40,
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
          <Image
            source={{
              uri: `https://image.pollinations.ai/prompt/personprofilepicture?width=200&height=320&nologo=true`,
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              alignSelf: "center",
              marginTop: 20,
            }}
          />

          {/* Name */}
          <Text
            style={{
              color: theme.text,
              fontFamily: theme.fonts.regular,
              fontSize: 16,
              fontWeight: "bold",
              color: "#FFFFFF",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            User Name
          </Text>

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
              <Text
                style={{
                  color: theme.text,
                  fontFamily: theme.fonts.regular,
                  fontSize: 14,
                  color: "rgba(255, 255, 255, 0.5)",
                  marginVertical: 6,
                }}
              >
                user@mail.com
              </Text>
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
              <Text
                style={{
                  color: theme.text,
                  fontFamily: theme.fonts.regular,
                  fontSize: 14,
                  color: "rgba(255, 255, 255, 0.5)",
                  marginVertical: 6,
                }}
              >
                ********
              </Text>
            </View>
          </View>

          <View style={{ height: 50, marginTop: 40 }}>
            <GradientButton text={"EDIT PROFILE"} onPress={() => {navigation.navigate("EditProfile")}}/>
          </View>

          <View style={{ height: 50, marginTop: 20 }}>
            <Button text={"SIGN OUT"} color={"gray"} onPress={() => handleLogout()}/>
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
