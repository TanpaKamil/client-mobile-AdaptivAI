import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, TouchableOpacity, View } from "react-native";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../contexts/ThemeContext";
import { cardModuleStyles } from "../../styles/componentStyles";

export default function ModuleCard({ module, onPress }) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["#8753A1", "#5F56E2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={cardModuleStyles.gradientContainer}
      >
        <View style={cardModuleStyles.rowContainer}>
          <Image
            source={{
              uri: "https://image.pollinations.ai/prompt/illustrationof" + module.title + "?width=200&height=320&nologo=true",
            }}
            style={cardModuleStyles.imgSize}
          />
          <View style={cardModuleStyles.columnContainer}>
            <Text
              style={[
                {
                  color: theme.text,
                  fontFamily: theme.fonts.regular,
                },
                cardModuleStyles.titleText,
              ]}
            >
              {module.title}
            </Text>
            <Text
              style={[
                {
                  color: theme.text,
                  fontFamily: theme.fonts.regular,
                },
                cardModuleStyles.descriptionText,
              ]}
            >
              By : {module.createdBy}
            </Text>
          </View>
        </View>
        <View style={cardModuleStyles.subscriberContainer}>
          <IonIcons name="bookmarks-outline" size={12} color="#FFFFFF" />
          <Text style={cardModuleStyles.subscriberText}>{module.totalSubscribers}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
