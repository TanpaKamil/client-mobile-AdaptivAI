import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
} from "react-native";
import GradientButton from "../components/buttons/GradientButton";
import Button from "../components/buttons/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTheme } from "../contexts/ThemeContext";
import { useError } from "../contexts/ErrorContext";
import { useLoading } from "../contexts/LoadingContext";
import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";
import { useNavigation } from "@react-navigation/native";

export default function AssessmentScreen({ route }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { showError } = useError();
  const { startLoading, stopLoading } = useLoading();
  const { instanceId, chapterId } = route.params;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchAssessment();
  }, []);

  async function fetchAssessment() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/modules/instances/${instanceId}/assessment`
      );
      setQuestions(data.data.questions);
    } catch (err) {
      showError(err.message || "Failed to fetch assessment");
    } finally {
      setLoading(false);
    }
  }

  async function handleAnswerSubmit(selectedAnswer) {
    try {
      startLoading();
      const currentQuestion = questions[currentPage];

      setAnswers(prev => ({
        ...prev,
        [currentQuestion.questionId]: selectedAnswer
      }));

      await axios.put(
        `/api/modules/instances/${instanceId}/assessment`,
        {
          questionId: currentQuestion.questionId,
          userAnswer: selectedAnswer
        }
      );

      // Automatically move to next question if not on last question
      if (currentPage < questions.length - 1) {
        handleNext();
      }

    } catch (err) {
      showError(err.message || "Failed to submit answer");
    } finally {
      stopLoading();
    }
  }

  async function submitAssessmentAndGetFeedback() {
    try {
      // Submit final assessment
      await axios.post(
        `/api/modules/instances/${instanceId}/assessment`
      );

      // Wait for feedback data to be ready
      const { data } = await axios.get(
        `/api/modules/instances/${instanceId}/chapters/${chapterId}/feedbacks`
      );

      // If both calls succeed, navigate to results
      navigation.replace("AssessmentResult", {
        instanceId,
        chapterId,
        feedback: data.data
      });

    } catch (err) {
      throw new Error(err.message || "Failed to process assessment");
    }
  }

  async function handleFinalSubmit() {
    try {
      // Validation check
      const answeredQuestions = Object.keys(answers).length;
      if (answeredQuestions < questions.length) {
        showError(`Please answer all questions. ${questions.length - answeredQuestions} remaining.`);
        return;
      }

      // Show loading modal
      setSubmitting(true);

      // Process assessment and get feedback
      await submitAssessmentAndGetFeedback();

    } catch (err) {
      showError(err.message);
      setSubmitting(false);
    }
  }

  function handleNext() {
    if (currentPage < questions.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  }

  function handlePrevious() {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  }

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color="#FBA459" />
      </View>
    );
  }

  const currentQuestion = questions[currentPage];
  const selectedAnswer = answers[currentQuestion.questionId];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Submission Loading Modal */}
      <Modal
        transparent={true}
        visible={submitting}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#FBA459" />
            <Text style={styles.modalText}>Processing your assessment...</Text>
          </View>
        </View>
      </Modal>

      <ScrollView>
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Question {currentPage + 1} of {questions.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentPage + 1) / questions.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <View style={styles.content}>
          {/* Rest of your existing JSX */}
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>
              {currentQuestion.question}
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleAnswerSubmit(index)}
                  style={[
                    styles.optionButton,
                    isSelected && styles.selectedOption
                  ]}
                >
                  <Text style={[
                    styles.optionNumber,
                    isSelected && styles.selectedText
                  ]}>
                    {index + 1}
                  </Text>

                  <Text style={[
                    styles.optionText,
                    isSelected && styles.selectedText
                  ]}>
                    {option}
                  </Text>

                  <View style={[
                    styles.checkCircle,
                    isSelected && styles.selectedCheckCircle
                  ]}>
                    {isSelected && (
                      <AntDesign name="checkcircle" size={24} color="#C17838" />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.navigationButtons}>
            {currentPage > 0 && (
              <View style={styles.navButton}>
                <Button
                  color="gray"
                  text="PREVIOUS"
                  onPress={handlePrevious}
                />
              </View>
            )}

            {currentPage < questions.length - 1 && (
              <View style={styles.navButton}>
                <Button
                  color="gray"
                  text="NEXT"
                  onPress={handleNext}
                />
              </View>
            )}
          </View>

          <View style={styles.submitButton}>
            <GradientButton
              text="SUBMIT"
              onPress={handleFinalSubmit}
              disabled={submitting}
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
    justifyContent: "center",
  },
  content: {
    flex: 1,
    marginHorizontal: 25,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    gap: 10,
  },
  modalText: {
    color: '#262626',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  progressContainer: {
    padding: 20,
    paddingBottom: 0,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#FFFFFF33',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FBA459',
    borderRadius: 2,
  },
  questionCard: {
    width: "100%",
    minHeight: 100,
    justifyContent: "center",
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FBA459",
    backgroundColor: "#FFFFFF",
    marginTop: 20,
  },
  questionText: {
    textAlign: "center",
    fontSize: 12,
  },
  optionsContainer: {
    marginVertical: 20,
    display: "flex",
    gap: 10,
  },
  optionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 12,
  },
  selectedOption: {
    backgroundColor: "#FBA459",
  },
  optionNumber: {
    textAlign: "center",
    fontSize: 14,
    color: "#262626",
  },
  optionText: {
    textAlign: "center",
    fontSize: 16,
    color: "#262626",
    width: "80%",
  },
  selectedText: {
    color: "#FFFFFF",
  },
  checkCircle: {
    width: 28,
    height: 28,
    backgroundColor: "white",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FBA459",
  },
  selectedCheckCircle: {
    borderColor: "#FFFFFF",
  },
  navigationButtons: {
    flexDirection: "row",
    gap: 20,
    height: 40,
    marginBottom: 20,
  },
  navButton: {
    flex: 1,
  },
  submitButton: {
    height: 50,
  },
});