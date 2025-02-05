import { Text, TouchableOpacity, View } from "react-native";
import DiscussionCard from "./cards/DiscussionCard";
import { discussionFeaturedStyles } from "../styles/componentParentStyles";
import { useNavigation } from "@react-navigation/native";
import { tranparentBtnStyles } from "../styles/componentStyles";

import { useTheme } from "../contexts/ThemeContext";
import { useDiscussions } from "../contexts/DiscussionContext";
import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";

export default function DiscussionFeatured() {
  const { theme } = useTheme();
  const { discussions, fetchDiscussions } = useDiscussions();
  const [ featured, setFeatured ] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  async function fetchDiscussionsFeatured() {
    try {
      const response = await axios({
        method: "GET",
        url: "/api/discussions/featured",
      });
      console.log(response.data);
      setFeatured(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDiscussionsFeatured();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <View style={discussionFeaturedStyles.mainContainer}>
        <Text
          style={[
            {
              color: theme.text,
              fontFamily: theme.fonts.regular,
            },
            discussionFeaturedStyles.titleText,
          ]}
        >
          Discussions
        </Text>
        {/* View all button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Discussion")}
          style={tranparentBtnStyles.mainContainer}
        >
          <Text
            style={{
              color: theme.text,
              fontFamily: theme.fonts.regular,
              fontSize: 10,
              marginLeft: 5,
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <View style={discussionFeaturedStyles.cardContainer}>
            {featured.map((discussion) => {
              return (
                <DiscussionCard
                  key={discussion._id}
                  discussion={discussion}
                  style={discussionFeaturedStyles.card}
                />
              ); 
            })}
      </View>
    </>
  );
}
