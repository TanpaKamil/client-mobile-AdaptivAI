import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import GradientButton from "../components/buttons/GradientButton";
import Divider from "../components/Divider";
import Button from "../components/buttons/Button";
import { flashCardStyles, ProgressCardStyles } from "../styles/pageStyles";

export default function ChapterScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
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
            <Text style={ProgressCardStyles.titleText}>Title Chapter 1</Text>
            <Text style={ProgressCardStyles.progressText}>
              Description Chapter{" "}
            </Text>

            <View style={ProgressCardStyles.badgeContainer}>
              <Text style={ProgressCardStyles.statusBadge}>STATUS</Text>
            </View>
          </LinearGradient>

          <View style={flashCardStyles.container}>
            <View style={flashCardStyles.flashcard}>
              <Text style={flashCardStyles.flashcardText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                imperdiet odio eget risus lacinia fermentum. Aliquam tempor et
                urna a vulputate. Duis id erat ut ipsum viverra pulvinar.
                Praesent nec dapibus lectus, suscipit sodales nulla. Aenean
                vitae quam varius, pharetra magna eget, vulputate mi. Nullam
                pharetra mi a venenatis sollicitudin. Praesent volutpat turpis
                at felis convallis eleifend. Phasellus gravida urna in aliquet
                facilisis. Nulla efficitur magna rutrum neque bibendum
                tincidunt. Praesent gravida sed tellus nec facilisis. Aliquam
                orci tellus, accumsan ut odio vel, suscipit porttitor tortor.
                Vivamus malesuada, felis nec facilisis tempor, neque lectus
                fringilla arcu, sed elementum neque arcu sed enim.
              </Text>
            </View>
          </View>

          <View style={flashCardStyles.orderBar}>
            <View
              style={[
                {
                  width: "80%",
                },
                flashCardStyles.orderProgress,
              ]}
            />
            <Text style={flashCardStyles.orderText}>8/10</Text>
          </View>

          <View
            style={{
              height: 50,
            }}
          >
            <GradientButton text={"NEXT"} />
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
                navigation.navigate("Assessment");
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
