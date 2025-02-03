import { Image, Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export default function DashboardProfile() {
  const { theme } = useTheme();

  // Fecth User Profile Data
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: theme.fonts.regular,
            color: theme.text,
          }}
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
        style={{
          width: 60,
          height: 60,
          borderRadius: 60,
        }}
      />
    </View>
  );
}
