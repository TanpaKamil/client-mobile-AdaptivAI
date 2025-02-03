import { Text, View } from "react-native";
import ModuleCard from "./cards/ModuleCard";
import { useTheme } from "../contexts/ThemeContext";

export default function RecommendedModule() {
  const { theme } = useTheme();
  return (
    <View
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
      }}
    >
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
      <View
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <ModuleCard />
        <ModuleCard />
        <ModuleCard />
      </View>
    </View>
  );
}
