import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import SearchBar from "../components/SearchInput";
import GradientButton from "../components/buttons/GradientButton";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";

export default function PublicModuleDetailScreen({ route }) {
  const { theme } = useTheme();
  // const { _id } = route.params;
  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState({});
  const [page, setPage] = useState(0);

  async function fetchModule() {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/modules/pub/" + _id,
      });

      setRes(data.data.module);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchModule();

    console.log(res);
  }, []);

  if (loading) return <Text>Loading ...</Text>;
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
              height: 240,
              backgroundColor: "transparent",
              borderRadius: 20,
            }}
          >
            <Image
              source={{
                uri: `https://image.pollinations.ai/prompt/illustrationofmodule?width=200&height=320&nologo=true`,
              }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: 20,
                zIndex: 0,
              }}
            />
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.9)", "rgba(0, 0, 0, 0.5)"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0.7, y: 1 }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: 20,
                zIndex: 0,
              }}
            />
            <View
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
                paddingHorizontal: 20,
                paddingVertical: 10,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 12,
                }}
              >
                by User Name 1
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    gap: 2,
                    width: 180,
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    {/* {res.title} */}
                  </Text>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 10,
                      fontWeight: 200,
                    }}
                  >
                    {/* {res.description} */}
                  </Text>
                </View>
                <View
                  style={{
                    padding: 6,
                    borderRadius: 40,
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    SUBSCRIBE
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              marginVertical: 20,
            }}
          >
            <SearchBar />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 250,
                minHeight: 200,
                paddingBottom: 20,
                paddingHorizontal: 20,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#FBA459",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 10,
                }}
              >
                {/* {res.chapters[page].title} */}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                }}
              >
                {/* {res.chapters[page].excerpt} */}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#FFFFFF",
              height: 20,
              borderRadius: 20,
              marginVertical: 20,
              display: "flex",
            }}
          >
            <View
              style={[
                {
                  backgroundColor: "#FBA459",
                  height: 20,
                  borderRadius: 20,
                },
                {
                  width: `${
                    // (res.chapters[page].order / res.chapters.length) * 100
                  100}%`,
                },
              ]}
            />
            <Text
              style={{
                position: "absolute",
                width: "100%",
                textAlign: "center",
                fontWeight: "bold",
                color: "#2D2784",
              }}
            >
              {/* {`${res.chapters[page].order}/${res.chapters.length}`} */}
            </Text>
          </View>

          <View
            style={{
              height: 50,
            }}
          >
            <GradientButton text={"NEXT"} onPress={() => setPage(page + 1)} />
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
