import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { CardDiscussionStyles } from "../../styles/componentStyles";
import { useNavigation } from "@react-navigation/native";

export default function DiscussionCard({ discussion }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={CardDiscussionStyles.mainContainer}
      onPress={() => {
        navigation.navigate("DiscussionDetail", {id : discussion._id});
      }}
    >
      <Image
        source={{
          uri: (discussion.imgUrl ? discussion.imgUrl : "https://image.pollinations.ai/prompt/illustrationof" + discussion.title + "?width=200&height=320&nologo=true"),
        }}
        style={CardDiscussionStyles.imgSize}
      />
      <View style={CardDiscussionStyles.columnContainer}>
        <Text
          style={[
            {
              color: theme.text,
              fontFamily: theme.fonts.regular,
            },
            CardDiscussionStyles.TitleText,
          ]}
        >
          {discussion.title}
        </Text>
        <Text
          style={[
            {
              fontFamily: theme.fonts.regular,
            },
            CardDiscussionStyles.seenText,
          ]}
        >
          {discussion.likes_length} likes • {discussion.comments_length} replies
        </Text>
      </View>
    </TouchableOpacity>
  );
}
