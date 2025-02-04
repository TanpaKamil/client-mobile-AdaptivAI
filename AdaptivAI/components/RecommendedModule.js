import { Text, View } from "react-native";
import ModuleCard from "./cards/ModuleCard";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { recommededModuleStyles } from "../styles/componentParentStyles";

export default function RecommendedModule() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={recommededModuleStyles.mainContainer}>
      <Text
        style={{
          color: theme.text,
          fontFamily: theme.fonts.regular,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        Top Recommendation Module
      </Text>
      {/* Module List */}
      <View style={recommededModuleStyles.cardContainer}>
        <ModuleCard onPress={() => navigation.navigate("PublicModuleDetail")} />
        <ModuleCard onPress={() => navigation.navigate("PublicModuleDetail")} />
        <ModuleCard onPress={() => navigation.navigate("PublicModuleDetail")} />
      </View>
    </View>
  );
}
