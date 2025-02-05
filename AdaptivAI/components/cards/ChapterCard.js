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
          Chapter {chapter.order}
        </Text>
        <Text style={CardChapterStyles.statusBadge}>{chapter.status}</Text>
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
        {chapter.title}
      </Text>
    </TouchableOpacity>
  );
}
