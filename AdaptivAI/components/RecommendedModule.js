import { Text, View } from "react-native";
import ModuleCard from "./cards/ModuleCard";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { recommededModuleStyles } from "../styles/componentParentStyles";
import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";

export default function RecommendedModule() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchRecommedModule() {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/modules/pub/recommendation",
      });
      setModules(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecommedModule();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }
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
        {modules?.modules.map((module) => (
          <ModuleCard
            key={module._id}
            module={module}
            onPress={() =>
              navigation.navigate("PublicModuleDetail", { _id: module._id })
            }
          />
        ))}
      </View>
    </View>
  );
}
