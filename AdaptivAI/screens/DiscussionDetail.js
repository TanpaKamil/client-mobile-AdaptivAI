import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import GradientButton from "../components/buttons/GradientButton";
import { useTheme } from "../contexts/ThemeContext";
import { useDiscussions } from "../contexts/DiscussionContext";
import { useAuth } from "../contexts/AuthContext";
import { useError } from "../contexts/ErrorContext";

export default function DiscussionDetail({ route }) {
  const { theme } = useTheme();
  const { discussions, addComment, toggleLike } = useDiscussions();
  const { user } = useAuth();
  const { showError } = useError();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={{
          flex: 1,
          marginTop: 20,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginHorizontal: 25,
          }}
        >
          <View
            style={{
              minHeight: 200,
              padding: 16,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#FBA459",
              backgroundColor: "#FFFFFF",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Image
                source={{
                  uri: `https://image.pollinations.ai/prompt/personprofilepicture?width=200&height=320&nologo=true`,
                }}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 50,
                }}
              />
              <View
                style={{
                  marginLeft: 6,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  Author
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "semibold",
                  }}
                >
                  {" "}
                  31 January 2025 13:30
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginVertical: 4,
              }}
            >
              Title Post
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="heart-outline" size={12} color="gray" />
                <Text style={{ fontSize: 10, marginLeft: 4 }}>16</Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="chatbubble-outline" size={12} color="gray" />
                <Text style={{ fontSize: 10, marginLeft: 4 }}>16</Text>
              </View>
            </View>
            <Text
              style={{
                textAlign: "justify",
                fontSize: 12,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              imperdiet odio eget risus lacinia fermentum. Aliquam tempor et
              urna a vulputate. Duis id erat ut ipsum viverra pulvinar. Praesent
              nec dapibus lectus, suscipit sodales nulla. Aenean vitae quam
              varius, pharetra magna eget, vulputate mi. Nullam pharetra mi a
              venenatis sollicitudin. Praesent volutpat turpis at felis
              convallis eleifend. Phasellus gravida urna in aliquet facilisis.
              Nulla efficitur magna rutrum neque bibendum tincidunt. Praesent
              gravida sed tellus nec facilisis.
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  borderRadius: 40,
                  backgroundColor: "#FBA459",
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Ionicons name="heart-outline" size={12} color="#FFFFFF" />
                <Text style={{ color: "#FFFFFF", fontSize: 10 }}>Like</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  borderRadius: 40,
                  backgroundColor: "#FBA459",
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Ionicons name="chatbubble-outline" size={12} color="#FFFFFF" />
                <Text style={{ color: "#FFFFFF", fontSize: 10 }}>Comment</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text
            style={{
              marginTop: 20,
              fontSize: 16,
              fontWeight: "bold",
              color: "#FFFFFF",
            }}
          >
            Discussion
          </Text>

          <FlatList
            style={{ marginTop: 10, display: "flex", gap: 20, height: 280 }}
            data={["Discussion 1", "Discussion 2", "Discussion 3", "discussion 4"]}
            renderItem={({ item }) => (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "white",
                  marginTop: 12,
                }}
              >
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Image
                    source={{
                      uri: `https://image.pollinations.ai/prompt/imageofrobot?width=200&height=200&nologo=true`,
                    }}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 5,
                    }}
                  />
                  <View
                    style={{
                      marginLeft: 6,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "#FFFFFF",
                      }}
                    >
                      Author
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "semibold",
                        color: "#FFFFFF",
                      }}
                    >
                      {" "}
                      31 January 2025 13:30
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#FFFFFF",
                    marginVertical: 8,
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  imperdiet odio eget risus lacinia fermentum. Aliquam tempor et
                  urna a vulputate. Duis id erat ut ipsum viverra pulvinar.
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View
          style={{
            height: 45,
            marginHorizontal: 25,
            marginBottom: 40,
          }}
        >
          <GradientButton text={"EDIT"} />
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
