import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
  } from "react-native";
  import { LinearGradient } from "expo-linear-gradient";
  import GradientButton from "../components/buttons/GradientButton";
  import { useTheme } from "../contexts/ThemeContext";
  import { useError } from "../contexts/ErrorContext";
  import { useEffect, useState } from "react";
  import axios from "../config/axiosInstance";
  import { useNavigation } from "@react-navigation/native";
  
  export default function AssessmentResultScreen({ route }) {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const { showError } = useError();
    const { instanceId, chapterId } = route.params;
    
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState(null);
  
    useEffect(() => {
      fetchFeedback();
    }, []);
  
    async function fetchFeedback() {
      try {
        const { data } = await axios.get(
          `/api/modules/instances/${instanceId}/chapters/${chapterId}/feedbacks`
        );
        setFeedback(data.data.feedback);
      } catch (err) {
        showError(err.message || "Failed to fetch feedback");
      } finally {
        setLoading(false);
      }
    }
  
    function handleContinue() {
      navigation.navigate("Chapters", { _id: instanceId });
    }
  
    if (loading) {
      return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <ActivityIndicator size="large" color="#FBA459" />
        </View>
      );
    }
  
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView>
          <View style={styles.content}>
            {/* Results Header */}
            <LinearGradient
              colors={["#5F56E2", "#8753A1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.headerCard}
            >
              <Text style={styles.headerTitle}>Assessment Results</Text>
              <Text style={styles.headerSubtitle}>
                Here's how you performed
              </Text>
            </LinearGradient>
  
            {/* Strengths Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Strengths</Text>
              {feedback?.understandingAnalysis?.strengths.map((strength, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.topicText}>{strength.topic}</Text>
                  <Text style={styles.levelText}>
                    Bloom's Level: {strength.bloomLevel}
                  </Text>
                  {strength.demonstratedSkills.map((skill, skillIndex) => (
                    <Text key={skillIndex} style={styles.skillText}>
                      • {skill}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
  
            {/* Areas for Improvement */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Areas for Improvement</Text>
              {feedback?.understandingAnalysis?.weakAreas.map((area, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.topicText}>{area.topic}</Text>
                  <Text style={styles.levelText}>
                    Target Level: {area.bloomLevel}
                  </Text>
                  {area.detectedIssues.map((issue, issueIndex) => (
                    <Text key={issueIndex} style={styles.issueText}>
                      • {issue}
                    </Text>
                  ))}
                  <Text style={styles.recommendationText}>
                    {area.recommendedFocus}
                  </Text>
                </View>
              ))}
            </View>
  
            {/* Adaptation Strategy */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Next Steps</Text>
              <View style={styles.card}>
                <Text style={styles.adaptationText}>
                  {feedback?.adaptationDetails?.recommendedApproach}
                </Text>
                <Text style={styles.focusText}>Focus Areas:</Text>
                {feedback?.adaptationDetails?.focusAreas.map((area, index) => (
                  <Text key={index} style={styles.focusItem}>
                    • {area}
                  </Text>
                ))}
              </View>
            </View>
  
            {/* Continue Button */}
            <View style={styles.buttonContainer}>
              <GradientButton
                text="CONTINUE"
                onPress={handleContinue}
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
    content: {
      flex: 1,
      marginHorizontal: 25,
      paddingVertical: 20,
    },
    headerCard: {
      width: "100%",
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#FFFFFF",
      textAlign: "center",
    },
    headerSubtitle: {
      fontSize: 16,
      color: "#FFFFFF",
      textAlign: "center",
      marginTop: 5,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#FFFFFF",
      marginBottom: 10,
    },
    card: {
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    topicText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 5,
    },
    levelText: {
      fontSize: 14,
      color: "#666",
      marginBottom: 10,
    },
    skillText: {
      fontSize: 14,
      color: "#444",
      marginLeft: 10,
      marginBottom: 3,
    },
    issueText: {
      fontSize: 14,
      color: "#666",
      marginLeft: 10,
      marginBottom: 3,
    },
    recommendationText: {
      fontSize: 14,
      color: "#5F56E2",
      fontWeight: "500",
      marginTop: 10,
      fontStyle: "italic",
    },
    adaptationText: {
      fontSize: 15,
      color: "#333",
      marginBottom: 10,
    },
    focusText: {
      fontSize: 15,
      fontWeight: "500",
      color: "#333",
      marginBottom: 5,
    },
    focusItem: {
      fontSize: 14,
      color: "#444",
      marginLeft: 10,
      marginBottom: 3,
    },
    buttonContainer: {
      height: 50,
      marginTop: 20,
      marginBottom: 40,
    },
  });