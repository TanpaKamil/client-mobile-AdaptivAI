import { Image, Text, TouchableOpacity, View } from "react-native";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../contexts/ThemeContext";
import FeatureCard from "./cards/FeatureCard";

export default function FeaturedModule() {
  const { theme } = useTheme();
  return (
    <View
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
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
          Featured Module
        </Text>

        {/* View all button */}
        <TouchableOpacity
          style={{
            paddingVertical: 2,
            paddingHorizontal: 10,
            borderColor: "#FBA459",
            borderWidth: 1,
            borderRadius: 8,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IonIcons name="chevron-down-outline" size={20} color="#FBA459" />
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
      <View
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 12,
          marginTop: 10,
        }}
      >
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
      </View>
    </View>
  );
}
