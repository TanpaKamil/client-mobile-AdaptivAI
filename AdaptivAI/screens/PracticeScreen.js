import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";
import GradientButton from "../components/buttons/GradientButton";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import axios from "../config/axiosInstance";
import { useError } from "../contexts/ErrorContext";

const QuestionCard = ({ question }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <TouchableOpacity 
      style={styles.questionCard}
      onPress={() => setShowAnswer(!showAnswer)}
      activeOpacity={0.7}
    >
      {/* Question Section */}
      <View style={styles.questionHeader}>
        <Text style={styles.questionText}>{question.question}</Text>
        <Text style={styles.difficultyText}>
          Level {question.difficultyLevel} • Bloom's {question.bloomLevel}
        </Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <View 
            key={`${question._id}-option-${index}`}
            style={[
              styles.optionItem,
              showAnswer && index === question.correctAnswer && styles.correctOption
            ]}
          >
            <Text style={[
              styles.optionText,
              showAnswer && index === question.correctAnswer && styles.correctOptionText
            ]}>
              {String.fromCharCode(65 + index)}. {option}
            </Text>
          </View>
        ))}
      </View>

      {/* Explanation (shown only when answer is revealed) */}
      {showAnswer && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationText}>
            {question.explanation}
          </Text>
        </View>
      )}

      <Text style={styles.tapText}>
        {showAnswer ? "Tap to hide answer" : "Tap to show answer"}
      </Text>
    </TouchableOpacity>
  );
};

const LevelButton = ({ level, isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.levelButton,
      isSelected && styles.selectedLevelButton
    ]}
    onPress={onPress}
  >
    <Text style={[
      styles.levelButtonText,
      isSelected && styles.selectedLevelText
    ]}>
      Level {level}
    </Text>
  </TouchableOpacity>
);

export default function PracticeScreen({ route }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { showError } = useError();
  const { instanceId, chapterId } = route.params;

  const [loading, setLoading] = useState(true);
  const [levels, setLevels] = useState([]);
  const [availableBloomLevels, setAvailableBloomLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/modules/instances/${instanceId}/chapters/${chapterId}/levels`
      );
      
      // Get available Bloom's levels from the response
      const bloomLevels = data.data.filters.availableBloomLevels.sort((a, b) => a - b);
      setAvailableBloomLevels(bloomLevels);
      
      // Set initial level and questions
      setLevels(data.data.levels);
      if (bloomLevels.length > 0) {
        setSelectedLevel(bloomLevels[0]);
        const questionsForLevel = data.data.levels.find(l => l.bloomLevel === bloomLevels[0]);
        setQuestions(questionsForLevel?.questions || []);
      }
    } catch (err) {
      showError(err.message || "Failed to fetch questions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleLevelSelect = async (level) => {
    try {
      setSelectedLevel(level);
      const levelQuestions = levels.find(l => l.bloomLevel === level);
      setQuestions(levelQuestions?.questions || []);
    } catch (err) {
      showError(err.message || "Failed to fetch questions for this level");
      console.error(err);
    }
  };

  const renderQuestion = ({ item }) => (
    <QuestionCard question={item} />
  );

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color="#FBA459" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {/* Level Selection */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.levelSelector}
        >
          {availableBloomLevels.map((level) => (
            <LevelButton
              key={`bloom-level-${level}`}
              level={level}
              isSelected={selectedLevel === level}
              onPress={() => handleLevelSelect(level)}
            />
          ))}
        </ScrollView>

        {/* Questions List */}
        <FlatList
          data={questions}
          renderItem={renderQuestion}
          keyExtractor={item => item._id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.questionsContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No questions available for this level</Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626",
  },
  content: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  levelSelector: {
    flexGrow: 0,
    marginBottom: 20,
  },
  levelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#303030",
    borderWidth: 1,
    borderColor: "#FBA459",
  },
  selectedLevelButton: {
    backgroundColor: "#FBA459",
  },
  levelButtonText: {
    color: "#FBA459",
    fontWeight: "bold",
  },
  selectedLevelText: {
    color: "#FFFFFF",
  },
  questionsContainer: {
    paddingBottom: 20,
  },
  questionCard: {
    backgroundColor: "#303030",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#606060",
  },
  questionHeader: {
    marginBottom: 10,
  },
  questionText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 5,
  },
  difficultyText: {
    color: "#FBA459",
    fontSize: 12,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderRadius: 5,
    backgroundColor: "#404040",
  },
  correctOption: {
    backgroundColor: "#2E7D32",
  },
  optionText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  correctOptionText: {
    fontWeight: "bold",
  },
  explanationContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#404040",
    borderRadius: 5,
  },
  explanationText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  tapText: {
    color: "#999",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
  emptyText: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
  }
});