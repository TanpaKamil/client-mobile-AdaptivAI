import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ButtonGenerate from "../components/buttons/ButtonGenerate";
import { useTheme } from "../contexts/ThemeContext";
import SearchBar from "../components/SearchInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import ModuleCard from "../components/cards/ModuleCard";
import { useNavigation } from "@react-navigation/native";

export default function PublicModuleScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={{ flex: 1, marginTop: 20, width: "100%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginHorizontal: 25,
          }}
        >
          <View
            style={{
              height: 50,
            }}
          >
            <ButtonGenerate text={"Create New Module"} />
          </View>

          <View
            style={{
              marginVertical: 30,
            }}
          >
            <SearchBar />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 20,
            }}
          >
            <View
              style={{
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
                Discussions
              </Text>

              {/* View all button */}
              <View style={{
                display:"flex",
                flexDirection: "row",
                gap: "10"
              }}>
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
                  <Ionicons
                    name="swap-vertical-outline"
                    size={12}
                    color="#FFFFFF"
                  />
                  <Text
                    style={{
                      color: theme.text,
                      fontFamily: theme.fonts.regular,
                      fontSize: 10,
                      marginLeft: 5,
                    }}
                  >
                    Recent
                  </Text>
                </TouchableOpacity>

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
                  <Ionicons
                    name="chevron-down-outline"
                    size={12}
                    color="#FFFFFF"
                  />
                  <Text
                    style={{
                      color: theme.text,
                      fontFamily: theme.fonts.regular,
                      fontSize: 10,
                      marginLeft: 5,
                    }}
                  >
                    English
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Module List Map */}
          <View style={{
            display: "flex",
            gap: 10
          }}>
            <ModuleCard onPress={() => navigation.navigate("PublicModuleDetail")}/>
            <ModuleCard />
            <ModuleCard />
            <ModuleCard />
            <ModuleCard />
            <ModuleCard />
            <ModuleCard />
            <ModuleCard />
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
