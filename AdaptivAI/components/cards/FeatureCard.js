import { Image, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export default function FeatureCard({ module }) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#303030",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#606060",
        width: 160,
        padding: 10,
      }}
    >
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHC_8-EMZFLsoGfcdsw3cR7IS3DmOf7tgoJg&s",
        }}
        style={{ height: 80, borderRadius: 10 }}
      />
      <Text
        style={{
          color: theme.text,
          fontFamily: theme.fonts.regular,
          fontSize: 12,
          marginTop: 5,
        }}
      >
        Machine Learning
      </Text>
    </TouchableOpacity>
  );
}
