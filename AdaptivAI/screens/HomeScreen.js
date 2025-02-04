import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import ButtonGenerate from "../components/buttons/ButtonGenerate";
import DashboardProfile from "../components/DashboardProfile";
import CurrentModule from "../components/CurrentModule";
import RecommendedModule from "../components/RecommendedModule";
import FeaturedModule from "../components/FeaturedModule";
import DiscussionFeatured from "../components/DiscussionFeatured";

export default function HomeScreen() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView>
        <View style={{ flex: 1, marginTop: 60, marginHorizontal: 25 }}>
          {/* Profile On Dashboard */}
          <DashboardProfile />

          {/* Button Generate Module */}
          <View style={styles.btn}>
            <ButtonGenerate text={"Create New Module"} />
          </View>

          {/* Current Module */}
          <CurrentModule />

          {/* Featured Module */}
          <FeaturedModule />

          {/* Top Reccomendation Module */}
          <RecommendedModule />

          {/* Discussions */}
          <DiscussionFeatured />
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
  btn: {
    display: "flex",
    marginTop: 30,
    height: 40,
  },
});
