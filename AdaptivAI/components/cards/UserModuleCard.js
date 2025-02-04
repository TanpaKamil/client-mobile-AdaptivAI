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
          Title
        </Text>
        <Text
          style={[
            {
              fontFamily: theme.fonts.regular,
            },
            cardUserModuleStyles.statusBadge,
          ]}
        >
          STATUS
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. asdasdsad
          asdasd asdsad asd asdas Sed imperdiet odio eget risus lacinia
          fermentum.
        </Text>

        <View style={cardUserModuleStyles.btnSize}>
          <GradientButton
            text={"Learn Now"}
            onPress={() => {
              navigation.navigate("Chapters");
            }}
          />
        </View>
      </View>
      <Text style={cardUserModuleStyles.lastOpenText}>Last Opened</Text>
    </View>
  );
}
