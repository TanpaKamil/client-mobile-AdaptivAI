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
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHC_8-EMZFLsoGfcdsw3cR7IS3DmOf7tgoJg&s",
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
              Machine Learning
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
              Introduction to AI
            </Text>
          </View>
        </View>
        <View style={cardModuleStyles.subscriberContainer}>
          <IonIcons name="bookmarks-outline" size={12} color="#FFFFFF" />
          <Text style={cardModuleStyles.subscriberText}>1K</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
