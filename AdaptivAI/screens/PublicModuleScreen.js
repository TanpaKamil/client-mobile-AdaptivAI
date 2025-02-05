import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ButtonGenerate from "../components/buttons/ButtonGenerate";
import SearchBar from "../components/SearchInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import ModuleCard from "../components/cards/ModuleCard";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";

import { useModules } from "../contexts/ModuleContext";
import { useTheme } from "../contexts/ThemeContext";
import { useLoading } from "../contexts/LoadingContext";
import { useError } from "../contexts/ErrorContext";

export default function PublicModuleScreen() {
  const { modules, fetchPublicModules } = useModules();
  const { theme } = useTheme();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showError } = useError();
  const navigation = useNavigation();
  const [res, setRes] = useState({});


  async function fetchPubModules() {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/modules/pub",
      });
      setRes(data.data);
      // console.log(data.data);
    } catch (err) {
      Alert.alert("Error", err.response.data.message);
    } finally {
      stopLoading();
    }
  }

  useEffect(() => {
    fetchPubModules();
    // console.log(res.modules);
  }, []);

  if (isLoading) {
    return <Text>Loading ...</Text>;
  }

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
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10",
                }}
              >
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
          <FlatList
            data={res.modules}
            renderItem={({ item }) => <ModuleCard module={item} key={item._id} onPress={() => navigation.navigate("PublicModuleDetail", {
              _id: item._id,
            })} />}
          />
          <View
            style={{
              display: "flex",
              gap: 10,
            }}
          >
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
