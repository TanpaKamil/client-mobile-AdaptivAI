import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { ButtonStyles } from "../../styles/componentStyles";

export default function GradientButton({ text, onPress }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity>
      <LinearGradient
        colors={["#FBA459", "#D95E6F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={ButtonStyles.buttonShape}
      >
        <Text
          style={[
            ButtonStyles.gradientButtonText,
            { fontFamily: theme.fonts.bold },
          ]}
        >
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
