import { Image, Text, TouchableOpacity, View } from "react-native";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../contexts/ThemeContext";
import FeatureCard from "./cards/FeatureCard";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";
import { featuredModuleStyles } from "../styles/componentParentStyles";
import { tranparentBtnStyles } from "../styles/componentStyles";

export default function FeaturedModule() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState([]);
  const navigation = useNavigation();

  async function fetchFeaturedModules() {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/modules/pub/featured",
      });
      setRes(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFeaturedModules();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Text>Loading ...</Text>
        </>
      ) : (
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

            {/* View all button */}
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

          {/* Featured Module List */}
          <View style={featuredModuleStyles.featureCardContainer}>
            {res.data.modules.map((module) => {
              return (
                <FeatureCard
                  module={module}
                  key={module._id}
                  onPress={() =>
                    navigation.navigate("PublicModuleDetail", {
                      _id: module._id,
                    })
                  }
                />
              );
            })}
          </View>
        </View>
      )}
    </>
  );
}
