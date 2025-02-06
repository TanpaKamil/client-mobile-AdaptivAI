import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GradientButton from "../components/buttons/GradientButton";
import Divider from "../components/Divider";
import Button from "../components/buttons/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTheme } from "../contexts/ThemeContext";
import { useModules } from "../contexts/ModuleContext";
import { useError } from "../contexts/ErrorContext";
import { useLoading } from "../contexts/LoadingContext";
import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";
import { useNavigation } from "@react-navigation/native";

export default function AssessmentScreen({ route }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { currentModule, submitAssessment } = useModules();
  const { showError } = useError();
  const { startLoading, stopLoading } = useLoading();
  const { instanceId } = route.params;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idxChoose, setIdxChoose] = useState(-1);
  const [userAnswers, setUserAnswers] = useState(-1);
  const [page, setPage] = useState(0);
  const [allAnswers, setAllAnswers] = useState({
    0: -1,
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
    7: -1,
    8: -1,
    9: -1,
  });

  async function handleAnswer(state) {
    try {
      await axios({
        method: "PUT",
        url: `/api/modules/instances/${instanceId}/assessment`,
        body: {
          questionId: questions[page].questionId,
          userAnswers: idxChoose,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setAllAnswers({ [page]: idxChoose });
      if (state === "prev") {
        setPage(page - 1);
      } else if (state === "next") {
        setPage(page + 1);
      }
      fetchAssessment();
    }
  }

  async function fetchAssessment() {
    try {
      const { data } = await axios({
        method: "GET",
        url: `/api/modules/instances/${instanceId}/assessment`,
      });

      setQuestions(data.data.questions);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    try {
      await axios({
        method: "POST",
        url: `/api/modules/instances/${instanceId}/assessment`,
      });

      navigation.navigate("ModuleDetail", { _id: instanceId });
    } catch (err) {
      console.log(err);
    } finally {
      fetchAssessment();
    }
  }

  useEffect(() => {
    fetchAssessment();
  }, []);

  if (loading) {
    return <Text>Loading ...</Text>;
  }
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 25 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <View
              style={{
                width: "100%",
                minHeight: 100,
                display: "flex",
                justifyContent: "center",
                padding: 20,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#FBA459",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                }}
              >
                {questions[page].question}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginVertical: 20,
              display: "flex",
              gap: 10,
            }}
          >
            {questions[page].options.map((option, index) => {
              return (
                <>
                  {idxChoose === index || index === allAnswers[page] ? (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor: "#FBA459",
                        borderRadius: 10,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        gap: 12,
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 14,
                          color: "#FFFFFF",
                        }}
                      >
                        {index + 1}
                      </Text>

                      <Text
                        style={{
                          width: "80%",
                          textAlign: "center",
                          fontSize: 16,
                          color: "#FFFFFF",
                        }}
                      >
                        {option}
                      </Text>

                      <View
                        style={{
                          width: 28,
                          height: 28,
                          backgroundColor: "#FFFFFF",
                          borderRadius: 28,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 2,
                          borderColor: "#FFFFFF",
                        }}
                      >
                        <AntDesign
                          name="checkcircle"
                          size={24}
                          color="#C17838"
                        />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setIdxChoose(index)}
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: 10,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        gap: 12,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 14,
                          color: "#262626",
                        }}
                      >
                        {index + 1}
                      </Text>

                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 16,
                          color: "#262626",
                          width: "80%",
                        }}
                      >
                        {option}
                      </Text>

                      <View
                        style={{
                          width: 28,
                          height: 28,
                          backgroundColor: "white",
                          borderRadius: 28,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 2,
                          borderColor: "#FBA459",
                        }}
                      >
                        {/* <AntDesign name="checkcircle" size={20} color="#C17838" /> */}
                      </View>
                    </TouchableOpacity>
                  )}
                </>
              );
            })}
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
              height: 40,
              marginBottom: 20,
            }}
          >
            <View style={{ display: page === 0 ? "none" : "flex", flex: 1 }}>
              <Button
                color={"gray"}
                text={"PREVIOUS"}
                onPress={() => handleAnswer("prev")}
              />
            </View>
            <View
              style={{
                display: page === questions.length - 1 ? "none" : "flex",
                flex: 1,
              }}
            >
              <Button
                color={"gray"}
                text={"NEXT"}
                onPress={() => handleAnswer("next")}
              />
            </View>
          </View>

          <View
            style={{
              height: 50,
            }}
          >
            <GradientButton text={"SUBMIT"} onPress={() => handleSubmit()} />
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
});
