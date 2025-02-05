import { useTheme } from "../contexts/ThemeContext";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import GradientButton from "../components/buttons/GradientButton";
import { FormInputStyles } from "../styles/componentStyles";
import Button from "../components/buttons/Button";
import Divider from "../components/Divider";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "../config/axiosInstance";

export default function RegisterScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const hadleRegister = async () => {
    try {
      if (!email || !password || !passwordConfirmation) {
        Alert.alert("Error", "Please fill all fields");
        throw new Error({
          data: {
            message: "Please fill all fields",
          },
        });
      }
      if (password !== passwordConfirmation) {
        Alert.alert("Error", "Password and password confirmation do not match");
        throw new Error( "Password and password confirmation do not match");
      }
      const { data } = await axios({
        method: "POST",
        url: "/api/users/register",
        data: {
          email,
          password,
        },
      });
      navigation.navigate("Login");
      Alert.alert("Success", "Account created successfully");
    } catch (err) {
      Alert.alert("Error", err.response.data.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image
        source={require("../assets/AdaptiveAI_Logo.png")}
        style={styles.logo} // Apply the style
        resizeMode="contain" // Ensure it scales within the screen
      />
      <Text
        style={{
          color: theme.text,
          fontFamily: theme.fonts.regular,
          marginTop: 20,
        }}
      >
        Hi There!
      </Text>
      <Text
        style={{
          color: theme.text,
          fontFamily: theme.fonts.regular,
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Let's Get Started
      </Text>

      {/* Login Form */}
      <View style={FormInputStyles.formContainer}>
        {/* Username Input */}
        <View style={FormInputStyles.inputContainer}>
          <TextInput
            style={FormInputStyles.inputText}
            placeholder="email"
            onChangeText={setEmail}
            value={email}
          />
        </View>

        {/* Password Input */}
        <View style={FormInputStyles.inputContainer}>
          <TextInput
            style={FormInputStyles.inputText}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
        </View>

        {/* Password Confirmation Input */}
        <View style={FormInputStyles.inputContainer}>
          <TextInput
            style={FormInputStyles.inputText}
            placeholder="Password Confirmation"
            secureTextEntry={true}
            onChangeText={setPasswordConfirmation}
            value={passwordConfirmation}
          />
        </View>

        {/* Sign In Button*/}
        <View style={FormInputStyles.btn}>
          <GradientButton
            text={"Create an Account"}
            onPress={() => hadleRegister()}
          />
        </View>

        {/* Divider */}
        <Divider />

        {/* Sign Up Button*/}
        <View style={FormInputStyles.btn}>
          <Button
            text={"Sign In"}
            color={"gray"}
            onPress={() => navigation.navigate("Login")}
          />
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
  logo: {
    width: 240, // Set appropriate width
    height: 100, // Set appropriate height
  },
});
