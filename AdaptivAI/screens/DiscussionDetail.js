import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import GradientButton from "../components/buttons/GradientButton";
import { useTheme } from "../contexts/ThemeContext";
import { useDiscussions } from "../contexts/DiscussionContext";
import { useAuth } from "../contexts/AuthContext";
import { useError } from "../contexts/ErrorContext";
import axios from "../config/axiosInstance";
import { use, useEffect, useState } from "react";
import Button from "../components/buttons/Button";

export default function DiscussionDetail({ route }) {
  const { theme } = useTheme();
  const { discussions, addComment, toggleLike } = useDiscussions();
  const { user } = useAuth();
  const { showError } = useError();
  const { id } = route.params;
  const [discussionById, setDiscussionById] = useState({});
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [contentPost, setContentPost] = useState({
    content: "",
  });

  async function fetchDiscussionById() {
    try {
      console.log(id);
      const { data } = await axios({
        method: "GET",
        url: `/api/discussions/${id}`,
      });
      console.log(data);
      setDiscussionById(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function toggleLikeHandler() {
    try {
      toggleLike(discussionById._id);
      fetchDiscussionById();
    } catch (err) {
      console.error(err);
    }
  }

  async function addCommentHandler() {
    try {
      await addComment(discussionById._id, commentContent);
    } catch (err) {
      console.error(err);
    } finally {
      fetchDiscussionById();
      setCommentContent("");
      setCommentForm(false);
    }
  }

  async function editPost() {
    try {
      // const formData = new FormData();
      // formData.append("content", contentPost.content);

      await axios({
        method: "PUT",
        url: `/api/discussions/${discussionById._id}`,
        data: {
          content: contentPost.content,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
        
      })
    } catch (err) {
      console.log(err);
    } finally {
      setContentPost({ content: "" });
      fetchDiscussionById();
    }
  }

  useEffect(() => {
    fetchDiscussionById();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

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
                  uri:
                    "https://image.pollinations.ai/prompt/profileof" +
                    discussionById?.userId?.username +
                    "?width=200&height=320&nologo=true",
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
                  {discussionById.userId.username}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "semibold",
                  }}
                >
                  {" "}
                  {discussionById.createdAt}
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
              {discussionById.title}
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
                <Text style={{ fontSize: 10, marginLeft: 4 }}>
                  {discussionById.likes_length}
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="chatbubble-outline" size={12} color="gray" />
                <Text style={{ fontSize: 10, marginLeft: 4 }}>
                  {discussionById.comments_length}
                </Text>
              </View>
            </View>
            {contentPost.content ? (
              <TextInput
                style={{
                  textAlign: "justify",
                  fontSize: 12,
                  borderWidth: 1,
                  marginBottom: 10,
                  borderRadius: 5,
                  borderColor: "#FBA459",
                  padding: 5,
                }}
                multiline={true}
                onChangeText={(text) => setContentPost({ content: text })}
                value={contentPost.content}
              ></TextInput>
            ) : (
              <Text
                style={{
                  textAlign: "justify",
                  fontSize: 12,
                }}
              >
                {discussionById.content}
              </Text>
            )}

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => toggleLikeHandler()}
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
                onPress={() => setCommentForm(true)}
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
          <View
            style={{
              display: commentForm ? "flex" : "none",
              marginTop: 10,
              backgroundColor: "#FBA459",
              padding: 10,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              Comments :
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                padding: 5,
                marginTop: 5,
                marginBottom: 5,
                justifyContent: "space-between",
              }}
            >
              <TextInput
                onChangeText={(text) => setCommentContent(text)}
                value={commentContent}
                style={{
                  borderColor: "#FBA459",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  fontSize: 12,
                  width: "80%",
                  height: 40,
                }}
                placeholder="input comment .."
              />

              <TouchableOpacity
                onPress={() => addCommentHandler()}
                style={{
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  backgroundColor: "#FFFFFF",
                  gap: 4,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#FBA459",
                    fontSize: 10,
                    textAlignVertical: "center",
                  }}
                >
                  Send
                </Text>
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
            data={discussionById.comments}
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
                      uri: `https://image.pollinations.ai/prompt/profileof${item.userId.username}?width=200&height=200&nologo=true`,
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
                      {item.userId.username}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "semibold",
                        color: "#FFFFFF",
                      }}
                    >
                      {" "}
                      {item.createdAt}
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
                  {item.content}
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
          {contentPost.content ? (
            <GradientButton
              text={"SAVE"}
              onPress={() => editPost()}
            />
          ) : (
            <GradientButton
              text={"EDIT"}
              onPress={() =>
                setContentPost({ content: discussionById.content })
              }
            />
          )}
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
