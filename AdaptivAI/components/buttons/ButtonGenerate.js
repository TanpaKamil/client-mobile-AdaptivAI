import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { ButtonStyles } from "../../styles/componentStyles";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ButtonGenerate({ text, onPress }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[ButtonStyles.buttonShape, { backgroundColor: "#FBA459" }]}
      onPress={onPress}
    >
      <View style={{ width:"95%", display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        <View style={{width: 28}}></View>
        <Text
          style={[ButtonStyles.buttonText, { fontFamily: theme.fonts.bold }]}
        >
          {text}
        </Text>
        <Ionicons name="add-circle-outline" size={28} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
}
