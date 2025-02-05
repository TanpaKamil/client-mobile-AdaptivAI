import { useTheme } from "../contexts/ThemeContext";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import GradientButton from "../components/buttons/GradientButton";
import { FormInputStyles } from "../styles/componentStyles";
import Button from "../components/buttons/Button";
import Divider from "../components/Divider";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useError } from "../contexts/ErrorContext";
import { useLoading } from "../contexts/LoadingContext";

export default function LoginScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { login } = useAuth();
  const { showError } = useError();
  const { startLoading, stopLoading } = useLoading();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      console.log('Missing credentials');
      showError('Email and password are required');
      return;
    }

    try {
      console.log('Starting login process...');
      startLoading('Logging in...');
      const result = await login(email, password);
      console.log('Login result:', result);

      if (!result.success) {
        console.log('Login failed:', result.error);
        showError(result.error || 'Login failed');
        return;
      }

      console.log('Login successful, navigating to Dashboard...');
      // navigation.replace('Dashboard');
    } catch (err) {
      console.error('Login error:', err);
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
        Welcome Back
      </Text>
      <Text
        style={{
          color: theme.text,
          fontFamily: theme.fonts.regular,
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        Please, Log In.
      </Text>

      <View style={FormInputStyles.formContainer}>
        <View style={FormInputStyles.inputContainer}>
          <TextInput
            style={FormInputStyles.inputText}
            placeholder="Email"
            placeholderTextColor={theme.text}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={FormInputStyles.inputContainer}>
          <TextInput
            style={FormInputStyles.inputText}
            placeholder="Password"
            placeholderTextColor={theme.text}
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
        </View>

        <View style={FormInputStyles.btn}>
          <GradientButton
            text={"Sign In"}
            onPress={handleLogin}
            colors={theme.gradientColors}
          />
        </View>

        <Divider />

        <View style={FormInputStyles.btn}>
          <Button
            text={"Sign Up"}
            color={"gray"}
            onPress={() => navigation.navigate("Register")}
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