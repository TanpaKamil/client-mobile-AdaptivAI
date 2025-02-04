import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import DiscussionCard from "./cards/DiscussionCard";
import { discussionFeaturedStyles } from "../styles/componentParentStyles";
import { useNavigation } from "@react-navigation/native";
import { tranparentBtnStyles } from "../styles/componentStyles";

export default function DiscussionFeatured() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return (
    <>
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
        {/* View all button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Discussion")}
          style={tranparentBtnStyles.mainContainer}
        >
          <Text
            style={{
              color: theme.text,
              fontFamily: theme.fonts.regular,
              fontSize: 10,
              marginLeft: 5,
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <View style={discussionFeaturedStyles.cardContainer}>
        {/* Disccusion Card */}
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
      </View>
    </>
  );
}
