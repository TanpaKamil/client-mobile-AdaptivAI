import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  Platform
} from "react-native";
import ButtonGenerate from "../components/buttons/ButtonGenerate";
import DashboardProfile from "../components/DashboardProfile";
import CurrentModule from "../components/CurrentModule";
import RecommendedModule from "../components/RecommendedModule";
import FeaturedModule from "../components/FeaturedModule";
import DiscussionFeatured from "../components/DiscussionFeatured";
import * as SecureStore from "expo-secure-store";

import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useDiscussions } from "../contexts/DiscussionContext";
import { useModules } from "../contexts/ModuleContext";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { discussions, fetchDiscussions } = useDiscussions();
  const { modules, fetchPublicModules } = useModules();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  // Handle initial data fetching
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      console.log(token);
      await Promise.all([
        fetchDiscussions(),
        fetchPublicModules()
      ]);
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  };

  // Handle pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadInitialData();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleGeneratePress = () => {
    navigation.navigate("Dashboard", { screen: "Generate" });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary || "#000"]} // Android
            tintColor={theme.primary || "#000"} // iOS
            progressBackgroundColor={theme.background}
          />
        }
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <DashboardProfile />

          <View style={styles.btn}>
            <ButtonGenerate 
              text="Create New Module" 
              onPress={handleGeneratePress}
            />
          </View>

          <CurrentModule />
          <FeaturedModule />
          <RecommendedModule />
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
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    marginTop: 60,
    marginHorizontal: 25,
  },
  btn: {
    marginTop: 30,
    height: 40,
  }
});