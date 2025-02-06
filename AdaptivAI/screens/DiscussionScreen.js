import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import DiscussionCard from "../components/cards/DiscussionCard";
import GradientButton from "../components/buttons/GradientButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchBar from "../components/SearchInput";
import { useNavigation } from "@react-navigation/native";
import { tranparentBtnStyles } from "../styles/componentStyles";

import { useTheme } from "../contexts/ThemeContext";
import { useDiscussions } from "../contexts/DiscussionContext";
import { useLoading } from "../contexts/LoadingContext";
import { useEffect, useState } from "react";
import { discussionFeaturedStyles } from "../styles/componentParentStyles";

export default function DiscussionScreen() {
  const { theme } = useTheme();
  const { discussions, fetchDiscussions } = useDiscussions();
  const { startLoading, stopLoading } = useLoading();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDiscussions();
  }, []);

  async function loadDiscussions() {
    try {
      setLoading(true);
      await fetchDiscussions();
    } catch (error) {
      console.error('Error loading discussions:', error);
    } finally {
      setLoading(false);
    }
  }

  // Handle navigation to discussion detail
  const handleDiscussionPress = (discussionId) => {
    if (discussionId) {
      navigation.navigate("DiscussionDetail", { id: discussionId });
    }
  };

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
        <View style={styles.content}>
          <SearchBar />

          {/* Discussion Section */}
          <View style={styles.discussionSection}>
            <View style={styles.headerRow}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Discussions
              </Text>

              {/* Sort button */}
              <TouchableOpacity style={tranparentBtnStyles.mainContainer}>
                <Ionicons
                  name="swap-vertical-outline"
                  size={12}
                  color="#FFFFFF"
                />
                <Text style={[styles.sortText, { color: theme.text }]}>
                  Recent
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.discussionsContainer}>
              <FlatList
                data={discussions}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleDiscussionPress(item._id)}
                    activeOpacity={0.7}
                  >
                    <DiscussionCard
                      discussion={item}
                      style={discussionFeaturedStyles.card}
                    />
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>No discussions found</Text>
                }
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <GradientButton
              text={"START DISCUSSION"}
              onPress={() => navigation.navigate("StartDiscussion")}
            />
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
  },
  wrapper: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    marginTop: 60,
    marginHorizontal: 25,
  },
  discussionSection: {
    marginTop: 40,
    marginBottom: 30,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sortText: {
    fontSize: 10,
    marginLeft: 5,
  },
  discussionsContainer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#303030",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#606060",
  },
  emptyText: {
    color: "#FFFFFF",
    textAlign: "center",
    padding: 20,
  },
  buttonContainer: {
    height: 50,
  }
});