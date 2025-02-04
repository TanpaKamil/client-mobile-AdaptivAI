import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { CardChapterStyles } from "../../styles/componentStyles";

export default function ChapterCard({ chapter, onPress }) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={CardChapterStyles.chapterContainer}>
      <View
        style={CardChapterStyles.containerSpace}
      >
        <Text
          style={CardChapterStyles.orderText}
        >
          Chapter 1
        </Text>
        <Text style={CardChapterStyles.statusBadge}>STATUS</Text>
      </View>
      <Text
        style={[
          {
            color: theme.text,
            fontFamily: theme.fonts.regular,
          },
          CardChapterStyles.titleText,
        ]}
      >
        Introduction to Web Development
      </Text>
    </TouchableOpacity>
  );
}
