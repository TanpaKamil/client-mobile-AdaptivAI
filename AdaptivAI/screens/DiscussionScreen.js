import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import { useEffect } from "react";
import { discussionFeaturedStyles } from "../styles/componentParentStyles";

export default function DiscussionScreen() {
  const { theme } = useTheme();
  const { discussions, fetchDiscussions } = useDiscussions();
  const { startLoading, stopLoading } = useLoading();
  const navigation = useNavigation();

  useEffect(() => {
    fetchDiscussions();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={{ width: "100%", height: "100%" }}>
        <View style={{ flex: 1, marginTop: 60, marginHorizontal: 25 }}>
          <SearchBar />

          {/* Discussion Section */}
          <View
            style={{
              marginTop: 40,
              display: "flex",
              flexDirection: "column",
              marginBottom: 30,
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
              <TouchableOpacity style={tranparentBtnStyles.mainContainer}>
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
            </View>

            <View
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                padding: 12,
                backgroundColor: "#303030",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#606060",
                gap: 12,
              }}
            >
              {/* Disccusion Card */}
              <FlatList
                data={discussions}
                renderItem={({ item }) => (
                  <DiscussionCard
                    discussion={item}
                    key={item._id}
                    style={discussionFeaturedStyles.card}
                  />
                )}
              />
            </View>
          </View>

          <View
            style={{
              height: 50,
            }}
          >
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
    alignItems: "center",
    justifyContent: "center",
    color: "#FFFFFF",
  },
});
