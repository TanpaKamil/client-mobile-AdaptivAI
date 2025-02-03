import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { ButtonStyles } from "../../styles/componentStyles";

export default function Button({ text, onPress, color }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={[ButtonStyles.buttonShape, { backgroundColor: color }]}
    onPress={onPress}
    >
        <Text
          style={[
            ButtonStyles.buttonText,
            { fontFamily: theme.fonts.bold },
          ]}
        >
          {text}
        </Text>
    </TouchableOpacity>
  );
}
