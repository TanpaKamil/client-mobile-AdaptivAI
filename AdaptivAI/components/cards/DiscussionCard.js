import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export default function DiscussionCard({ discussion }) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={{ display: "flex", flexDirection: "row" }}>
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHC_8-EMZFLsoGfcdsw3cR7IS3DmOf7tgoJg&s",
        }}
        style={{ width: 40, height: 40, borderRadius: 5 }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: 10,
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontFamily: theme.fonts.regular,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Discussions
        </Text>
        <Text
          style={{
            color: "rgba(255, 255, 255, 0.25)",
            fontFamily: theme.fonts.regular,
            fontSize: 12,
          }}
        >
          Last reply 2h ago • 5 replies
        </Text>
      </View>
    </TouchableOpacity>
  );
}
