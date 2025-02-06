import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import GradientButton from "../components/buttons/GradientButton";
import Divider from "../components/Divider";
import Button from "../components/buttons/Button";
import { flashCardStyles, ProgressCardStyles } from "../styles/pageStyles";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "../contexts/ThemeContext";
import { useModules } from "../contexts/ModuleContext";
import { useLoading } from "../contexts/LoadingContext";
import { useError } from "../contexts/ErrorContext";
import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";

const FlashCard = ({ content, frontText, backText, onFlip, isFlipped }) => (
  <TouchableOpacity
    style={[flashCardStyles.flashcard, styles.flashcardShadow]}
    onPress={onFlip}
    activeOpacity={0.8}
  >
    <Text style={[flashCardStyles.flashcardText, styles.contentText]}>
      {content}
    </Text>

    <Text style={flashCardStyles.flashcardText}>
      {isFlipped ? backText : frontText}
    </Text>

    <View style={styles.flipIndicator}>
      <Ionicons 
        name={isFlipped ? "repeat" : "refresh"} 
        size={18} 
        color="#5F56E2" 
      />
      <Text style={styles.flipText}>
        {isFlipped ? "Flip to Front" : "Flip to Back"}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function ChapterScreen({ route }) {
  const { theme } = useTheme();
  const { currentModule } = useModules();
  const { startLoading, stopLoading } = useLoading();
  const { showError } = useError();
  const navigation = useNavigation();
  
  const { instanceId, chapterId } = route.params;
  const [loading, setLoading] = useState(true);
  const [chapter, setChapter] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchChapterById();
  }, [instanceId, chapterId]);

  async function fetchChapterById() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/modules/instances/${instanceId}/chapters/${chapterId}`
      );
      setChapter(data.data.chapter);
    } catch (err) {
      showError(err.message || "Failed to load chapter");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleNavigation = (screen) => {
    navigation.navigate(screen, {
      instanceId,
      chapterId
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color="#FBA459" />
        <Text style={styles.loadingText}>Loading chapter content...</Text>
      </View>
    );
  }

  if (!chapter) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.background }]}>
        <Text style={styles.errorText}>Failed to load chapter content</Text>
        <Button text="Try Again" onPress={fetchChapterById} />
      </View>
    );
  }

  const summary = chapter.content.summaries[currentPage];
  const totalPages = chapter.content.summaries.length;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Chapter Header */}
          <LinearGradient
            colors={["#5F56E2", "#8753A1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[ProgressCardStyles.containerSize, styles.headerShadow]}
          >
            <Text style={ProgressCardStyles.titleText}>{chapter.title}</Text>
            <View style={ProgressCardStyles.badgeContainer}>
              <Text style={ProgressCardStyles.statusBadge}>
                {chapter.progress.status}
              </Text>
            </View>
          </LinearGradient>

          {/* Flashcard Section */}
          <View style={flashCardStyles.container}>
            <FlashCard
              content={summary.content}
              frontText={summary.flashcardFront}
              backText={summary.flashcardBack}
              onFlip={() => setIsFlipped(!isFlipped)}
              isFlipped={isFlipped}
            />
          </View>

          {/* Progress Bar */}
          <View style={flashCardStyles.orderBar}>
            <View
              style={[
                { width: `${(currentPage / totalPages) * 100}%` },
                flashCardStyles.orderProgress
              ]}
            />
            <Text style={flashCardStyles.orderText}>
              {currentPage + 1}/{totalPages}
            </Text>
          </View>

          {/* Navigation Buttons */}
          <View style={styles.navigationButtons}>
            {currentPage > 0 && (
              <View style={styles.navButton}>
                <GradientButton
                  text="PREV"
                  onPress={() => setCurrentPage(prev => prev - 1)}
                />
              </View>
            )}
            {currentPage < totalPages - 1 && (
              <View style={styles.navButton}>
                <GradientButton
                  text="NEXT"
                  onPress={() => setCurrentPage(prev => prev + 1)}
                />
              </View>
            )}
          </View>

          {/* Assessment Section */}
          <Text style={styles.dividerText}>Ready To Take Assessment?</Text>
          <View style={styles.buttonContainer}>
            <GradientButton
              text="Take Assessment"
              onPress={() => handleNavigation("Assessment")}
            />
          </View>

          <Divider />

          {/* Practice Section */}
          <View style={styles.buttonContainer}>
            <Button
              color="gray"
              text="Practice More"
              onPress={() => handleNavigation("Practice")}
            />
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
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginHorizontal: 25,
    paddingVertical: 20,
  },
  headerShadow: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  flashcardShadow: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  contentText: {
    fontSize: 18,
    marginBottom: 20,
  },
  flipIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 8,
  },
  flipText: {
    color: "#5F56E2",
    fontSize: 14,
  },
  navigationButtons: {
    flexDirection: "row",
    gap: 20,
    height: 50,
    marginTop: 20,
  },
  navButton: {
    flex: 1,
  },
  dividerText: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFFFFF",
    marginVertical: 24,
  },
  buttonContainer: {
    height: 50,
    marginBottom: 20,
  },
  loadingText: {
    color: "#FFFFFF",
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 20,
  }
});