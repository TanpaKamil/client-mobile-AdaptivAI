import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import GradientButton from "../components/buttons/GradientButton";

export default function GenerateModuleScreen() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={{ width: "100%", height: "100%" }}>
        <View style={{ flex: 1, marginTop: 60, marginHorizontal: 25 }}>
          <Text
            style={{
              textAlign: "left",
              fontFamily: theme.fonts.bold,
              color: theme.text,
              fontSize: 18,
            }}
          >
            Input File
          </Text>
          <View
            style={{
              width: "100%",
              height: 120,
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              padding: 12,
              backgroundColor: "#303030",
              borderRadius: 12,
              borderWidth: 2,
              borderColor: "#FFFFFF",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: theme.fonts.regular,
                fontSize: 14,
                color: "rgba(255,255,255,0.25)",
                textAlign: "left",
                width: "100%",
              }}
            >
              PDF File Max 20MB
            </Text>
            <Ionicons
              name="add-circle-sharp"
              size={45}
              color="#716AD8"
              style={{ justifyContent: "center" }}
            />
          </View>

          <Text
            style={{
              textAlign: "left",
              fontFamily: theme.fonts.bold,
              color: theme.text,
              fontSize: 18,
              marginTop: 20,
              marginBottom: 6,
            }}
          >
            Language
          </Text>

          <View
            style={{
              width: "100%",
              marginTop: 10,
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              borderWidth: 2,
              borderColor: "rgba(100,100,100,0.8)",
            }}
          >
            <Picker>
              <Picker.Item
                label="Bahasa Indonesia"
                value="id"
                themeVariant={"light"}
              />
              <Picker.Item label="English" value="en" />
            </Picker>
          </View>

          <Text
            style={{
              textAlign: "left",
              fontFamily: theme.fonts.bold,
              color: theme.text,
              fontSize: 18,
              marginVertical: 10,
            }}
          >
            Additional Notes
          </Text>

          <TextInput
            style={{
              width: "100%",
              height: 150,
              padding: 12,
              backgroundColor: "#303030",
              borderRadius: 12,
              borderWidth: 2,
              borderColor: "#FFFFFF",
              color: "#FFFFFF",
              textAlign: "left",
              textAlignVertical: "top",
            }}
            defaultValue="Input additional notes"
            multiline={true}
          />

          <View style={{
            width: "100%", height: 50, marginTop: 20
          }}>
            <GradientButton text={"GENERATE"} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    color: "#FFFFFF",
  },
});
