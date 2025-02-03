import { useTheme } from "../contexts/ThemeContext";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import GradientButton from "../components/buttons/GradientButton";
import { FormInputStyles } from "../styles/componentStyles";
import Button from "../components/buttons/Button";
import Divider from "../components/Divider";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();

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
      <View
        style={{
          justifyContent: "center",
          marginTop: 40,
          marginBottom: 60,
          gap: 20,
          width: 280,
        }}
      >
        {/* Username Input */}
        <View style={FormInputStyles.inputContainer}>
          <TextInput style={FormInputStyles.inputText} placeholder="Username" />
        </View>

        {/* Password Input */}
        <View style={FormInputStyles.inputContainer}>
          <TextInput
            style={FormInputStyles.inputText}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>

        {/* Password Confirmation Input */}
        <View style={FormInputStyles.inputContainer}>
          <TextInput
            style={FormInputStyles.inputText}
            placeholder="Password Confirmation"
            secureTextEntry={true}
          />
        </View>

        {/* Sign In Button*/}
        <View style={{ width: 280, height: 50, display: "flex" }}>
          <GradientButton text={"Create an Account"} onPress={() => {}} />
        </View>

        {/* Divider */}
        <Divider />

        {/* Sign Up Button*/}
        <View style={{ width: 280, height: 50, display: "flex" }}>
          <Button text={"Sign In"} color={"gray"} onPress={() => navigation.navigate("Login")} />
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
