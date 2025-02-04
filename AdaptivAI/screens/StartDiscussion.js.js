import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import GradientButton from "../components/buttons/GradientButton";

export default function StartDiscussionScreen() {
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
            Upload Image
          </Text>
          <View
            style={{
              width: "100%",
              height: 120,
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 12,
              backgroundColor: "#303030",
              borderRadius: 12,
              borderWidth: 2,
              borderColor: "#FFFFFF",
              gap: 2,
              alignItems: "center",
            }}
          >
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
            Title
          </Text>

          <TextInput
            style={{
              width: "100%",
              padding: 12,
              height: 50,
              backgroundColor: "#303030",
              borderRadius: 12,
              borderWidth: 2,
              borderColor: "#FFFFFF",
              color: "#FFFFFF",
              textAlign: "left",
              textAlignVertical: "top",
            }}
            defaultValue="Input Title"
          />

          <Text
            style={{
              textAlign: "left",
              fontFamily: theme.fonts.bold,
              color: theme.text,
              fontSize: 18,
              marginVertical: 10,
            }}
          >
            Content
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
            defaultValue="Write your questions"
            multiline={true}
          />

          <View style={{
            width: "100%", height: 50, marginTop: 20
          }}>
            <GradientButton text={"START DISCUSSION"} />
          </View>
        </View>
      </View>
    </View>
  )
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
