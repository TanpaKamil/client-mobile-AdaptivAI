import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GradientButton from "../components/buttons/GradientButton";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../contexts/ThemeContext";
import { useModules } from "../contexts/ModuleContext";
import { useAuth } from "../contexts/AuthContext";
import { useError } from "../contexts/ErrorContext";
import { useLoading } from "../contexts/LoadingContext";

export default function PublicModuleDetailScreen({ route }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { currentModule, fetchModuleById, startModuleInstance } = useModules();
  const { user } = useAuth();
  const { showError } = useError();
  const { startLoading, stopLoading } = useLoading();
  const { _id } = route.params;
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

  const handleSubscribe = async () => {
    try {
      await startModuleInstance(res._id);
      navigation.replace("Dashboard",{screen: "MyModule"});
    } catch (error) {
      showError(error.message || 'Failed to subscribe to module');
    }
  };

  useEffect(() => {
    fetchModule();
  }, []);

  if (loading) return <Text>Loading ...</Text>;
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {/* Module Header Card */}
        <View style={styles.headerCard}>
          <Image
            source={{
              uri: `https://image.pollinations.ai/prompt/moduleillustrationof${res.title}?width=200&height=320&nologo=true`,
            }}
            style={styles.headerImage}
          />
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.9)", "rgba(0, 0, 0, 0.5)"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0.7, y: 1 }}
            style={styles.headerGradient}
          />
          <View style={styles.headerContent}>
            <Text style={styles.authorText}>by {res.createdBy.username}</Text>
            <View style={styles.titleContainer}>
              <View style={styles.titleContent}>
                <Text style={styles.titleText}>{res.title}</Text>
                <Text style={styles.descriptionText}>{res.description}</Text>
              </View>
              <TouchableOpacity
                onPress={handleSubscribe}
                style={styles.subscribeButton}
              >
                <Text style={styles.subscribeText}>SUBSCRIBE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Chapter Content Card */}
        <View style={styles.chapterCardContainer}>
          <View style={styles.chapterCard}>
            <Text style={styles.chapterTitle}>{res.chapters[page].title}</Text>
            <Text style={styles.chapterExcerpt}>{res.chapters[page].excerpt}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[
            styles.progressBar,
            { width: `${(res.chapters[page].order / res.chapters.length) * 100}%` }
          ]} />
          <Text style={styles.progressText}>
            {`${res.chapters[page].order}/${res.chapters.length}`}
          </Text>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationButtons}>
          <View style={{ flex: 1, display: page === 0 ? "none" : "flex"}}>
            <GradientButton text={"PREV"} onPress={() => setPage(page - 1)} />
          </View>
          <View style={{ flex: 1, display: page === res.chapters.length - 1 ? "none" : "flex"}}>
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
  },
  content: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 25,
    display: "flex",
    justifyContent: "space-between",
  },
  headerCard: {
    height: 240,
    backgroundColor: "transparent",
    borderRadius: 20,
    marginBottom: 40,
  },
  headerImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    zIndex: 0,
  },
  headerGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    zIndex: 0,
  },
  headerContent: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  authorText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontStyle: "italic",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  titleContent: {
    display: "flex",
    gap: 2,
    width: 180,
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  descriptionText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "200",
  },
  subscribeButton: {
    padding: 6,
    borderRadius: 40,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
  },
  subscribeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  chapterCardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  chapterCard: {
    width: 250,
    minHeight: 200,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FBA459",
    backgroundColor: "#FFFFFF",
  },
  chapterTitle: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 10,
  },
  chapterExcerpt: {
    textAlign: "center",
    fontSize: 12,
  },
  progressBarContainer: {
    backgroundColor: "#FFFFFF",
    height: 20,
    borderRadius: 20,
    marginBottom: 20,
    display: "flex",
  },
  progressBar: {
    backgroundColor: "#FBA459",
    height: 20,
    borderRadius: 20,
  },
  progressText: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: "#2D2784",
  },
  navigationButtons: {
    height: 40,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
});