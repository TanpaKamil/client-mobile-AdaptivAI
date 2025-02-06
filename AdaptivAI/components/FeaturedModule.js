import { Image, Text, TouchableOpacity, View } from "react-native";
import IonIcons from "@expo/vector-icons/Ionicons";
import FeatureCard from "./cards/FeatureCard";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import axios from "../config/axiosInstance";
import { featuredModuleStyles } from "../styles/componentParentStyles";
import { tranparentBtnStyles } from "../styles/componentStyles";

import { useTheme } from "../contexts/ThemeContext";
import { useModules } from "../contexts/ModuleContext";
import { useLoading } from "../contexts/LoadingContext";

export default function FeaturedModule() {
  const { theme } = useTheme();
  const { fetchModules, modules } = useModules();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const navigation = useNavigation();

  const [featuredModules, setFeaturedModules] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchFeaturedModules() {
      try {
        startLoading();
        const { data } = await axios({
          method: "GET",
          url: "/api/modules/pub/featured",
        });
        
        if (isMounted) {
          setFeaturedModules(data?.data?.modules || []);
        }
      } catch (err) {
        console.error("Error fetching featured modules:", err);
      } finally {
        if (isMounted) {
          stopLoading();
        }
      }
    }

    fetchFeaturedModules();

    return () => {
      isMounted = false;
    };
  }, [startLoading, stopLoading]);

  if (isLoading) {
    return <Text>Loading ...</Text>;
  }

  return (
    <View style={featuredModuleStyles.mainContainer}>
      <View style={featuredModuleStyles.titleContainer}>
        <Text
          style={{
            color: theme.text,
            fontFamily: theme.fonts.regular,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Featured Module
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("PublicModule")}
          style={tranparentBtnStyles.mainContainer}
        >
          <Text
            style={{
              color: theme.text,
              fontFamily: theme.fonts.regular,
              fontSize: 10,
              marginLeft: 5,
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <View style={featuredModuleStyles.featureCardContainer}>
        {featuredModules.map((module) => (
          <FeatureCard
            module={module}
            key={module._id}
            onPress={() =>
              navigation.navigate("PublicModuleDetail", {
                _id: module._id,
              })
            }
          />
        ))}
      </View>
    </View>
  );
}