import { ScrollView, StyleSheet, Text, View } from "react-native";
import GradientButton from "../components/buttons/GradientButton";
import Divider from "../components/Divider";
import Button from "../components/buttons/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTheme } from "../contexts/ThemeContext";
import { useModules } from "../contexts/ModuleContext";
import { useError } from "../contexts/ErrorContext";
import { useLoading } from "../contexts/LoadingContext";

export default function AssessmentScreen() {
  const { theme } = useTheme();
  const { currentModule, submitAssessment } = useModules();
  const { showError } = useError();
  const { startLoading, stopLoading } = useLoading();

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
                width: 250,
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
                Ini adalah pertanyaan pertama !!
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
            <View
              style={{
                backgroundColor: "#FBA459",
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
                  color: "#FFFFFF",
                }}
              >
                A
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: "#FFFFFF",
                }}
              >
                Optional Answer
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
