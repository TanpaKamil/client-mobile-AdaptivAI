import { ScrollView, StyleSheet, View } from "react-native";
import GradientButton from "../components/buttons/GradientButton";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";

export default function PracticeScreen({route}) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { instanceId, chapterId } = route.params;


  async function fetchQuestions() {
    try {
      const { data } = await axios({
        method: "GET",
        url: `/api/modules/instances/${instanceId}/chapters/${chapterId}/levels`,
      });
      console.log(data.data.questions);
      setQuestions(data.data.questions);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 25 }}>
          <View style={{ marginTop: 40, height: 40, width: 240 }}>
            <GradientButton
              text={"See your last feedback"}
              onPress={() => {}}
            />
          </View>

          {/* Mapping for Questions Card */}
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontFamily: theme.fonts.bold,
                color: theme.text,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Questions
            </Text>
            <View style={{ height: 300, marginTop: 10 }}>
              {/* <FlatList
                      data={questions}
                      renderItem={({ item }) => <QuestionCard question={item} />}
                    /> */}
            </View>
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
    alignItems: "center",
    justifyContent: "center",
    color: "#FFFFFF",
  },
});
