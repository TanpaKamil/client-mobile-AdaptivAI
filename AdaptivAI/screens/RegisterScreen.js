import { useTheme } from "../contexts/ThemeContext";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import GradientButton from "../components/buttons/GradientButton";
import { FormInputStyles } from "../styles/componentStyles";
import Button from "../components/buttons/Button";
import Divider from "../components/Divider";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useError } from "../contexts/ErrorContext";
import { useLoading } from "../contexts/LoadingContext";

export default function RegisterScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { register } = useAuth();
  const { showError } = useError();
  const { startLoading, stopLoading } = useLoading();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleRegister = async () => {
    // Input validation
    if (!email || !password || !passwordConfirmation) {
      showError('Please fill all fields');
      return;
    }

    if (password !== passwordConfirmation) {
      showError('Password and password confirmation do not match');
      return;
    }

    try {
      startLoading('Creating your account...');
      const result = await register(email, password);

      if (!result.success) {
        showError(result.error);
        return;
      }

      // Show success message and navigate to login
      showError('Account created successfully', 'success');
      navigation.navigate("Login");
    } catch (err) {
      showError(err.message || 'An unexpected error occurred');
    } finally {
      stopLoading();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image
        source={require("../assets/AdaptiveAI_Logo.png")}
        style={styles.logo}
        resizeMode="contain"
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

      <View style={FormInputStyles.formContainer}>
        <View style={FormInputStyles.inputContainer}>
          <TextInput
            style={FormInputStyles.inputText}
            placeholder="Input your email"
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={FormInputStyles.inputContainer}>
          <TextInput
            style={FormInputStyles.inputText}
            placeholder="Input your password"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
        </View>

        <View style={FormInputStyles.inputContainer}>
          <TextInput
            style={FormInputStyles.inputText}
            placeholder="Password Confirmation"
            secureTextEntry={true}
            onChangeText={setPasswordConfirmation}
            value={passwordConfirmation}
          />
        </View>

        <View style={FormInputStyles.btn}>
          <GradientButton
            text={"Create an Account"}
            onPress={handleRegister}
            colors={theme.gradientColors}
          />
        </View>

        <Divider />

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
    width: 240,
    height: 100,
  },
});