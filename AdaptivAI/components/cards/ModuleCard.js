import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, TouchableOpacity, View } from "react-native";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../contexts/ThemeContext";

export default function ModuleCard({ module }) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity>
      <LinearGradient
        colors={["#8753A1", "#5F56E2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHC_8-EMZFLsoGfcdsw3cR7IS3DmOf7tgoJg&s",
            }}
            style={{ width: 40, height: 40, borderRadius: 5 }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 10,
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
              Machine Learning
            </Text>
            <Text
              style={{
                color: theme.text,
                fontFamily: theme.fonts.regular,
                fontSize: 12,
              }}
            >
              Introduction to AI
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 2,
            padding: 8,
            borderRadius: 12,
            borderColor: "#FFFFFF",
            borderWidth: 1,
            backgroundColor: "rgba(255, 255, 255, 0.25)",
          }}
        >
          <IonIcons name="bookmarks-outline" size={12} color="#FFFFFF" />
          <Text style={{ color: "#FFFFFF", fontSize: 12 }}>1K</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
