import { FlatList, StyleSheet, Text, View } from "react-native";
import ButtonGenerate from "../components/buttons/ButtonGenerate";
import UserModuleCard from "../components/cards/UserModuleCard";
import { MyModuleStyles } from "../styles/pageStyles";

import { useTheme } from "../contexts/ThemeContext";
import { useModules } from "../contexts/ModuleContext";
import { useAuth } from "../contexts/AuthContext";

export default function MyModuleScreen() {
  const { theme } = useTheme();
  const { modules, fetchPublicModules } = useModules();
  const { user } = useAuth();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={{ flex: 1, marginTop: 60, width: "100%" }}>
        <View style={MyModuleStyles.mainContainer}>
          {/* Button Generate Module */}
          <View style={MyModuleStyles.btnGenerate}>
            <ButtonGenerate text={"Create New Module"} />
          </View>

          {/* User Modules List */}
          <View style={MyModuleStyles.columnContainer}>
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
            <View style={{ height: "88%" }}>
              <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                renderItem={({ item }) => <UserModuleCard key={item}/>}
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
