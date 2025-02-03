import { Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import DiscussionCard from "./cards/DiscussionCard";

export default function DiscussionFeatured() {
  const { theme } = useTheme();
  return (
    <View
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        marginBottom: 30,
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
      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          padding: 12,
          backgroundColor: "#303030",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#606060",
          gap: 12,
        }}
      >
        {/* Disccusion Card */}
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
      </View>
    </View>
  );
}
