import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useModules } from "../contexts/ModuleContext";
import { LinearGradient } from "expo-linear-gradient";
import ChapterCard from "../components/cards/ChapterCard";
import { useNavigation } from "@react-navigation/native";
import { MyModuleDetailStyles, ProgressCardStyles } from "../styles/pageStyles";

export default function MyModuleDetail() {
  const { theme } = useTheme();
  const { currentModule, fetchModuleById } = useModules();
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
            <Text style={ProgressCardStyles.titleText}>Title Module 1</Text>
            <Text style={ProgressCardStyles.progressText}>
              Description Module{" "}
            </Text>
            <View style={ProgressCardStyles.progressContainer}>
              <Text style={ProgressCardStyles.progressText}>Progress</Text>
              <Text style={ProgressCardStyles.progressText}>75%</Text>
            </View>

            {/* Progress Bar */}
            <View
              style={{
                backgroundColor: "#2D2784",
                height: 10,
                borderRadius: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  height: 10,
                  width: "75%",
                  borderRadius: 5,
                }}
              />
            </View>

            <View style={ProgressCardStyles.scoreContainer}>
              <Text style={ProgressCardStyles.categoryText}>
                Current Chapter:
              </Text>
              <Text style={ProgressCardStyles.valueText}> React Basic</Text>
            </View>

            <View style={ProgressCardStyles.scoreContainer}>
              <Text style={ProgressCardStyles.categoryText}>
                Comperhension Score:
              </Text>
              <Text style={ProgressCardStyles.valueText}>85%</Text>
            </View>

            <Text style={ProgressCardStyles.lastAccessText}>
              Last accessed about 1 year ago
            </Text>

            <View style={ProgressCardStyles.badgeContainer}>
              <Text style={ProgressCardStyles.statusBadge}>STATUS</Text>
            </View>
          </LinearGradient>

          <View style={MyModuleDetailStyles.cardContainer}>
            <ChapterCard onPress={() => navigation.navigate("Chapter")} />
            <ChapterCard />
            <ChapterCard />
            <ChapterCard />
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
