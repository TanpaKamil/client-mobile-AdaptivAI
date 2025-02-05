import { Text, View } from "react-native";
import GradientButton from "../buttons/GradientButton";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { cardUserModuleStyles } from "../../styles/componentStyles";

export default function UserModuleCard({ module }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={cardUserModuleStyles.mainContainer}>
      <View style={cardUserModuleStyles.rowContainer}>
        <Text
          style={[
            {
              fontFamily: theme.fonts.bold,
              color: theme.text,
            },
            cardUserModuleStyles.titleText,
          ]}
        >
          {module.title}
        </Text>
        <Text
          style={[
            {
              fontFamily: theme.fonts.regular,
            },
            cardUserModuleStyles.statusBadge,
          ]}
        >
          {module.status}
        </Text>
      </View>

      {/* Description and learn button */}
      <View style={cardUserModuleStyles.rowBetweenContainer}>
        <Text
          style={[
            {
              fontFamily: theme.fonts.regular,
              color: theme.text,
            },
            cardUserModuleStyles.descriptionText,
          ]}
        >
          {module.excerpt}
        </Text>

        <View style={cardUserModuleStyles.btnSize}>
          <GradientButton
            text={"Learn Now"}
            onPress={() => {
              navigation.navigate("Chapters", { instanceId: module._id });
            }}
          />
        </View>
      </View>
      <Text style={cardUserModuleStyles.lastOpenText}>{module.lastAccessedAt}</Text>
    </View>
  );
}
