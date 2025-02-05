import { Image, Text, View } from "react-native";
import { dashBoardProfileStyles } from "../styles/componentParentStyles";

import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";


export default function DashboardProfile() {
  const { theme } = useTheme();
  const { user } = useAuth();

  if (!user) {
    return <Text>Loading...</Text>;
  }
  // Fecth User Profile Data
  return (
    <View style={dashBoardProfileStyles.mainContainer}>
      <View>
        <Text
          style={[
            {
              fontFamily: theme.fonts.regular,
              color: theme.text,
            },
            dashBoardProfileStyles.welcomeText,
          ]}
        >
          Hello {user.username} !!
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: theme.fonts.regular,
            color: theme.text,
          }}
        >
          Continue your learning journey!
        </Text>
      </View>
      <Image
        source={{
          uri: user.imageUrl,
        }}
        style={dashBoardProfileStyles.imgSize}
      />
    </View>
  );
}
