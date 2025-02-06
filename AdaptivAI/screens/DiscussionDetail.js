import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import GradientButton from "../components/buttons/GradientButton";
import { useTheme } from "../contexts/ThemeContext";
import { useDiscussions } from "../contexts/DiscussionContext";
import { useAuth } from "../contexts/AuthContext";
import { useError } from "../contexts/ErrorContext";
import axios from "../config/axiosInstance";
import { useEffect, useState } from "react";
import Button from "../components/buttons/Button";

const DEFAULT_PROFILE_IMAGE = 'https://ui-avatars.com/api/?background=random';
const windowWidth = Dimensions.get('window').width;

// Helper function to get profile image URL
const getProfileImage = (user) => {
  if (!user) return DEFAULT_PROFILE_IMAGE;
  return user.imgUrl || DEFAULT_PROFILE_IMAGE;
};

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

  useEffect(() => {
    console.log('DiscussionDetail mounted with id:', id);
    if (id) {
      fetchDiscussionById();
    } else {
      console.error('No discussion ID provided');
      showError('No discussion ID provided');
      setLoading(false);
    }
  }, [id]);

  async function fetchDiscussionById() {
    console.log('Starting to fetch discussion with id:', id);
    try {
      const response = await axios({
        method: "GET",
        url: `/api/discussions/${id}`,
      });
      console.log('Discussion data received:', response.data);
      setDiscussionById(response.data);
    } catch (err) {
      console.error('Error fetching discussion:', err);
      showError(err.message || "Failed to fetch discussion");
    } finally {
      setLoading(false);
    }
  }

  async function fetchDiscussionById() {
    try {
      const { data } = await axios({
        method: "GET",
        url: `/api/discussions/${id}`,
      });
      setDiscussionById(data);
    } catch (err) {
      showError(err.message || "Failed to fetch discussion");
    } finally {
      setLoading(false);
    }
  }

  // ... other handlers stay the same ...

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color="#FBA459" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.wrapper}>
        <View style={styles.contentWrapper}>
          <View style={styles.discussionCard}>
            {/* User Info Section */}
            <View style={styles.userInfoContainer}>
              <Image
                source={{
                  uri: getProfileImage(discussionById?.userId)
                }}
                style={styles.profileImage}
              />
              <View style={styles.userTextContainer}>
                <Text style={styles.username}>
                  {discussionById.userId?.username}
                </Text>
                <Text style={styles.timestamp}>
                  {discussionById.createdAt}
                </Text>
              </View>
            </View>

            {/* Title Section */}
            <Text style={styles.title}>
              {discussionById.title}
            </Text>

            {/* Stats Section */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="heart-outline" size={12} color="gray" />
                <Text style={styles.statText}>
                  {discussionById.likes_length}
                </Text>
              </View>

              <View style={styles.statItem}>
                <Ionicons name="chatbubble-outline" size={12} color="gray" />
                <Text style={styles.statText}>
                  {discussionById.comments_length}
                </Text>
              </View>
            </View>

            {/* Discussion Image */}
            {discussionById.imgUrl && (
              <Image
                source={{ uri: discussionById.imgUrl }}
                style={styles.discussionImage}
                resizeMode="cover"
              />
            )}

            {/* Content Section */}
            {contentPost.content ? (
              <TextInput
                style={styles.contentInput}
                multiline={true}
                onChangeText={(text) => setContentPost({ content: text })}
                value={contentPost.content}
              />
            ) : (
              <Text style={styles.contentText}>
                {discussionById.content}
              </Text>
            )}

            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                onPress={() => toggleLikeHandler()}
                style={styles.actionButton}
              >
                <Ionicons name="heart-outline" size={12} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Like</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setCommentForm(true)}
                style={styles.actionButton}
              >
                <Ionicons name="chatbubble-outline" size={12} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Comment</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Comment Form */}
          {commentForm && (
            <View style={styles.commentFormContainer}>
              <Text style={styles.commentHeader}>
                Comments:
              </Text>
              <View style={styles.commentInputContainer}>
                <TextInput
                  onChangeText={setCommentContent}
                  value={commentContent}
                  style={styles.commentInput}
                  placeholder="input comment .."
                  placeholderTextColor="#999"
                />
                <TouchableOpacity
                  onPress={addCommentHandler}
                  style={styles.sendButton}
                >
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Comments List */}
          <Text style={styles.discussionHeader}>Discussion</Text>
          <FlatList
            style={styles.commentsList}
            data={discussionById.comments}
            renderItem={({ item }) => (
              <View style={styles.commentItem}>
                <View style={styles.commentUserInfo}>
                  <Image
                    source={{ uri: getProfileImage(item.userId) }}
                    style={styles.commentUserImage}
                  />
                  <View style={styles.commentUserText}>
                    <Text style={styles.commentUsername}>
                      {item.userId.username}
                    </Text>
                    <Text style={styles.commentTimestamp}>
                      {item.createdAt}
                    </Text>
                  </View>
                </View>
                <Text style={styles.commentContent}>
                  {item.content}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {/* Edit/Save Button */}
        <View style={styles.bottomButton}>
          <GradientButton
            text={contentPost.content ? "SAVE" : "EDIT"}
            onPress={contentPost.content ? editPost : () => setContentPost({ content: discussionById.content })}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    flex: 1,
    marginTop: 20,
    width: "100%",
  },
  contentWrapper: {
    flex: 1,
    marginHorizontal: 25,
  },
  discussionCard: {
    minHeight: 200,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FBA459",
    backgroundColor: "#FFFFFF",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  userTextContainer: {
    marginLeft: 6,
    justifyContent: "center",
  },
  username: {
    fontSize: 12,
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 10,
    color: "#666",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 10,
    marginLeft: 4,
    color: "gray",
  },
  discussionImage: {
    width: windowWidth - 50,
    height: 200,
    borderRadius: 8,
    marginVertical: 8,
  },
  contentInput: {
    textAlign: "justify",
    fontSize: 12,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#FBA459",
    padding: 5,
  },
  contentText: {
    textAlign: "justify",
    fontSize: 12,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 10,
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 40,
    backgroundColor: "#FBA459",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
  },
  commentFormContainer: {
    marginTop: 10,
    backgroundColor: "#FBA459",
    padding: 10,
    borderRadius: 8,
  },
  commentHeader: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  commentInputContainer: {
    flexDirection: "row",
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "space-between",
  },
  commentInput: {
    borderColor: "#FBA459",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 12,
    width: "80%",
    height: 40,
  },
  sendButton: {
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#FBA459",
    fontSize: 10,
  },
  discussionHeader: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  commentsList: {
    marginTop: 10,
    height: 280,
  },
  commentItem: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginTop: 12,
  },
  commentUserInfo: {
    flexDirection: "row",
  },
  commentUserImage: {
    width: 36,
    height: 36,
    borderRadius: 5,
  },
  commentUserText: {
    marginLeft: 6,
    justifyContent: "center",
  },
  commentUsername: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  commentTimestamp: {
    fontSize: 10,
    color: "#FFFFFF",
  },
  commentContent: {
    fontSize: 10,
    color: "#FFFFFF",
    marginVertical: 8,
  },
  bottomButton: {
    height: 45,
    marginHorizontal: 25,
    marginBottom: 40,
  },
}); 