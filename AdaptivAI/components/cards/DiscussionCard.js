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
        navigation.navigate("DiscussionDetail");
      }}
    >
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHC_8-EMZFLsoGfcdsw3cR7IS3DmOf7tgoJg&s",
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
          Discussions
        </Text>
        <Text
          style={[
            {
              fontFamily: theme.fonts.regular,
            },
            CardDiscussionStyles.seenText,
          ]}
        >
          Last reply 2h ago • 5 replies
        </Text>
      </View>
    </TouchableOpacity>
  );
}
