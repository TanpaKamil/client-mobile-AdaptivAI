import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import { useError } from "../contexts/ErrorContext";
import { useNavigation } from "@react-navigation/native";
import GradientButton from "../components/buttons/GradientButton";
import Button from "../components/buttons/Button";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const { showError } = useError();

  const handleLogout = async () => {
    try {
      startLoading('Logging out...');
      await logout();
    } catch (error) {
      showError('Failed to logout. Please try again.');
    } finally {
      stopLoading();
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.profileSection}>
        <Text style={[styles.headerText, { color: "#FBA459" }]}>
          PROFILE
        </Text>

        <Image
          source={{
            uri: `https://image.pollinations.ai/prompt/personprofilepicture?width=200&height=320&nologo=true`,
          }}
          style={styles.profileImage}
        />

        <Text style={[styles.nameText, { color: "#FFFFFF" }]}>
          {user?.email || 'User'}
        </Text>

        <View style={styles.infoItem}>
          <Ionicons name="mail-outline" size={32} color="#FFFFFF" />
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: "#FFFFFF" }]}>
              Email
            </Text>
            <Text style={[styles.infoValue, { color: "rgba(255, 255, 255, 0.5)" }]}>
              {user?.email || '-'}
            </Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="lock-closed-outline" size={32} color="#FFFFFF" />
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: "#FFFFFF" }]}>
              Password
            </Text>
            <Text style={[styles.infoValue, { color: "rgba(255, 255, 255, 0.5)" }]}>
              ********
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <GradientButton
            text="EDIT PROFILE"
            onPress={() => navigation.navigate("EditProfile")}
          />
          <View style={{ marginTop: 20 }}>
            <Button
              text="SIGN OUT"
              color="gray"
              onPress={handleLogout}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    flex: 1,
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  headerText: {
    fontFamily: "regular",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 20,
  },
  nameText: {
    fontFamily: "regular",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  infoItem: {
    flexDirection: "row",
    marginTop: 30,
  },
  infoContent: {
    flexDirection: "column",
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    width: "80%",
  },
  infoLabel: {
    fontFamily: "regular",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 6,
  },
  infoValue: {
    fontFamily: "regular",
    fontSize: 14,
    marginVertical: 6,
  },
  buttonContainer: {
    marginTop: 40,
    height: 50,
    width: '70%',  // or your preferred width
    alignSelf: 'center'
  }
});