import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import GradientButton from "../components/buttons/GradientButton";
import Divider from "../components/Divider";
import Button from "../components/buttons/Button";
import { flashCardStyles, ProgressCardStyles } from "../styles/pageStyles";

import { useTheme } from "../contexts/ThemeContext";
import { useModules } from "../contexts/ModuleContext";
import { useLoading } from "../contexts/LoadingContext";
import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";

export default function ChapterScreen({ route }) {
  const { theme } = useTheme();
  const { currentModule } = useModules();
  const { startLoading, stopLoading } = useLoading();
  const { instanceId, chapterId } = route.params;
  const [loading, setLoading] = useState(true);
  const [chapter, setChapter] = useState({});
  const [side, setSide] = useState("front");
  const [page, setPage] = useState(0);

  const navigation = useNavigation();

  async function fetchChapterById() {
    try {
      const { data } = await axios({
        method: "GET",
        url: `/api/modules/instances/${instanceId}/chapters/${chapterId}`,
      });

      setChapter(data.data.chapter);
      console.log(data.data.chapter);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchChapterById();
  }, []);

  if (loading) {
    return <Text>Loading ...</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 25 }}>
          <LinearGradient
            colors={["#5F56E2", "#8753A1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={ProgressCardStyles.containerSize}
          >
            <Text style={ProgressCardStyles.titleText}>{chapter.title}</Text>

            <View style={ProgressCardStyles.badgeContainer}>
              <Text style={ProgressCardStyles.statusBadge}>
                {chapter.progress.status}
              </Text>
            </View>
          </LinearGradient>

          <View style={flashCardStyles.container}>
            <TouchableOpacity
              style={flashCardStyles.flashcard}
              onPress={() =>
                side === "front" ? setSide("back") : setSide("front")
              }
            >
              <Text
                style={[
                  flashCardStyles.flashcardText,
                  { fontSize: 18, marginBottom: 20 },
                ]}
              >
                {chapter.content.summaries[page].content}
              </Text>

              <Text style={flashCardStyles.flashcardText}>
                {side === "front"
                  ? chapter.content.summaries[page].flashcardFront
                  : chapter.content.summaries[page].flashcardBack}
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  color: "#5F56E2",
                  marginTop: 20,
                }}
              >
                {side === "front" ? "Front Side" : "Back Side"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={flashCardStyles.orderBar}>
            <View
              style={[
                {
                  width: `${(page / chapter.content.summaries.length) * 100}%`,
                },
                flashCardStyles.orderProgress,
              ]}
            />
            <Text style={flashCardStyles.orderText}>
              {page}/{chapter.content.summaries.length - 1}
            </Text>
          </View>

          <View
            style={{
              height: 50,
              display: "flex",
              flexDirection: "row",
              gap: 20,
            }}
          >
            <View style={{ flex: 1, display: page === 0 ? "none" : "flex" }}>
              <GradientButton text={"PREV"} onPress={() => setPage(page - 1)} />
            </View>
            <View style={{ flex: 1, display: page === chapter.content.summaries.length - 1 ? "none" : "flex" }}>
              <GradientButton text={"NEXT"} onPress={() => setPage(page + 1)} />
            </View>
          </View>

          <Text style={styles.dividerText}>Ready To Take Assessment ?</Text>

          <View
            style={{
              height: 50,
            }}
          >
            <GradientButton
              text={"Take Assessment"}
              onPress={() => {
                navigation.navigate("Assessment", {instanceId: instanceId});
              }}
            />
          </View>

          <Divider />
          <View
            style={{
              height: 50,
              marginBottom: 40,
            }}
          >
            <Button color={"gray"} text={"Practice More"} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    color: "#FFFFFF",
  },
  dividerText: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFFFFF",
    marginVertical: 24,
  },
});
