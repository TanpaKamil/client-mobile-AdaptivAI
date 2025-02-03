import { FlatList, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import ButtonGenerate from "../components/buttons/ButtonGenerate";
import UserModuleCard from "../components/cards/UserModuleCard";

export default function MyModuleScreen() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={{ flex: 1, marginTop: 60, width: "100%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginHorizontal: 25,
          }}
        >
          {/* Button Generate Module */}
          <View
            style={{
              display: "flex",
              marginTop: 30,
              height: 40,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <ButtonGenerate text={"Create New Module"} />
          </View>

          {/* User Modules List */}
          <View
            style={{ marginVertical: 20, flexDirection: "column", gap: 12 }}
          >
            <Text
              style={{
                fontFamily: theme.fonts.bold,
                color: theme.text,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              My Modules
            </Text>
            <View style={{height: "88%"}}>
              <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                renderItem={({ item }) => <UserModuleCard />}
              />
            </View>
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
