
import { useTheme } from "../contexts/ThemeContext";
import {
  Alert,
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
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../config/axiosInstance";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const {setIsLogin} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const handleLogin = async () => {
    try {
      const {data} = await axios({
        method: "POST",
        url: "/api/users/login",
        data: {
          email,
          password,
        },
      })
      setIsLogin(true);
      const access_token = data.data.token
      await SecureStore.setItemAsync("access_token", access_token);
      // navigation.navigate("Dashboard");
      // console.log(data)
    } catch (err) {
      console.log(err)
      Alert.alert("Error", err.response.data.message);
    }
  }

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

      {/* Login Form */}
      <View
        style={FormInputStyles.formContainer}
      >
        {/* Username Input */}
        <View style={FormInputStyles.inputContainer}>
          <TextInput style={FormInputStyles.inputText} placeholder="Username" 
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

        {/* Sign In Button*/}
        <View style={FormInputStyles.btn}>
          <GradientButton text={"Sign In"} onPress={() => handleLogin()} />
        </View>

        {/* Divider */}
        <Divider />

        {/* Sign Up Button*/}
        <View style={FormInputStyles.btn}>
          <Button text={"Sign Up"} color={"gray"} onPress={() => navigation.navigate("Register")} />
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
