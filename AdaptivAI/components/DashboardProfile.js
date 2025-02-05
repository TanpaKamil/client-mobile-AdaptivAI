import { Image, Text, View } from "react-native";
import { dashBoardProfileStyles } from "../styles/componentParentStyles";

import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";


export default function DashboardProfile() {
  const { theme } = useTheme();
  const { user } = useAuth();

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
          Hello User
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
          uri: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww",
        }}
        style={dashBoardProfileStyles.imgSize}
      />
    </View>
  );
}
