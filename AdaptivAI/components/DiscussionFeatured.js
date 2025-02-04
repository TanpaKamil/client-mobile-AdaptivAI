import { Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import DiscussionCard from "./cards/DiscussionCard";
import { discussionFeaturedStyles } from "../styles/componentParentStyles";
import { useNavigation } from "@react-navigation/native";

export default function DiscussionFeatured() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={discussionFeaturedStyles.mainContainer}>
      <Text
        style={[
          {
            color: theme.text,
            fontFamily: theme.fonts.regular,
          },
          discussionFeaturedStyles.titleText,
        ]}
      >
        Discussions
      </Text>
      <View style={discussionFeaturedStyles.cardContainer}>
        {/* Disccusion Card */}
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
      </View>
    </View>
  );
}
