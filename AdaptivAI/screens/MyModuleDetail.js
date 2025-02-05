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
import { useEffect } from "react";

export default function MyModuleDetail( {route}) {
  const { theme } = useTheme();
  const { currentModule, fetchModuleById } = useModules();
  const navigation = useNavigation();
  const {instanceId} = route.params;

  useEffect(() => {
    fetchModuleById(instanceId);
  }, []);

  if (!currentModule) {
    return <Text>Loading...</Text>;
  }

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
            <Text style={ProgressCardStyles.titleText}>{currentModule.moduleTitle}</Text>
            <Text style={ProgressCardStyles.progressText}>
              {currentModule.moduleDescription}
            </Text>
            <View style={ProgressCardStyles.progressContainer}>
              <Text style={ProgressCardStyles.progressText}>Progress</Text>
              <Text style={ProgressCardStyles.progressText}>{`${currentModule.progress.chapterProgress.percentage}%`}</Text>
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
                  width: `${currentModule.progress.chapterProgress.percentage}%`,
                  borderRadius: 5,
                }}
              />
            </View>

            <View style={ProgressCardStyles.scoreContainer}>
              <Text style={ProgressCardStyles.categoryText}>
                Current Chapter:
              </Text>
              <Text style={ProgressCardStyles.valueText}> {currentModule.currentChapter.title}</Text>
            </View>

            <View style={ProgressCardStyles.scoreContainer}>
              <Text style={ProgressCardStyles.categoryText}>
                Comperhension Score:
              </Text>
              <Text style={ProgressCardStyles.valueText}>{currentModule.progress.comprehensionScore}%</Text>
            </View>

            <Text style={ProgressCardStyles.lastAccessText}>
              Last accessed about 1 year ago
            </Text>

            <View style={ProgressCardStyles.badgeContainer}>
              <Text style={ProgressCardStyles.statusBadge}>{currentModule.status}</Text>
            </View>
          </LinearGradient>

          <View style={MyModuleDetailStyles.cardContainer}>
            {currentModule.chapters.map((chapter) => {
              return (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  onPress={() => navigation.navigate("Chapter", { instanceId: currentModule.id, chapterId: chapter.id })}
                />
              );
            })}
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
