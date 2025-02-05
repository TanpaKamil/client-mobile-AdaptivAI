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

export default function AssessmentScreen({ route }) {
  const { theme } = useTheme();
  const { currentModule, submitAssessment } = useModules();
  const { showError } = useError();
  const { startLoading, stopLoading } = useLoading();
  const { instanceId } = route.params;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idxChoose, setIdxChoose] = useState(-1);

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
                {questions[0].question}
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
            {questions[0].options.map((option, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setIdxChoose(index)}
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
                    <AntDesign name="checkcircle" size={24} color="#C17838" />
                  </View>
                </TouchableOpacity>
              );
            })}

            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: 50,
                paddingVertical: 10,
                paddingHorizontal: 20,
                gap: 12,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  color: "#262626",
                }}
              >
                A
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: "#262626",
                }}
              >
                Optional Answer
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
            </View>

            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: 50,
                paddingVertical: 10,
                paddingHorizontal: 20,
                gap: 12,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  color: "#262626",
                }}
              >
                A
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: "#262626",
                }}
              >
                Optional Answer
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
            </View>

            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: 50,
                paddingVertical: 10,
                paddingHorizontal: 20,
                gap: 12,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  color: "#262626",
                }}
              >
                A
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: "#262626",
                }}
              >
                Optional Answer
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
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: 40,
                width: 140,
                marginBottom: 40,
              }}
            >
              <Button color={"gray"} text={"PREVIOUS"} />
            </View>
            <View
              style={{
                height: 40,
                width: 140,
                marginBottom: 40,
              }}
            >
              <Button color={"gray"} text={"NEXT"} />
            </View>
          </View>

          <View
            style={{
              height: 50,
            }}
          >
            <GradientButton text={"SUBMIT"} />
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
