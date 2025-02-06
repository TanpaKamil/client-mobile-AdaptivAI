import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabNavigator from "./TabNavigator";
import PublicModuleScreen from "../screens/PublicModuleScreen";
import { ActivityIndicator, Image, Text, View } from "react-native";
import PublicModuleDetailScreen from "../screens/PublicModuleDetail";
import ChapterScreen from "../screens/ChapterScreen";
import MyModuleDetail from "../screens/MyModuleDetail";
import AssessmentScreen from "../screens/AssessmentScreen";
import StartDiscussionScreen from "../screens/StartDiscussion.js";
import DiscussionDetail from "../screens/DiscussionDetail.js";
import DiscussionScreen from "../screens/DiscussionScreen.js";
import EditProfileScreen from "../screens/EditProfileScreen.js";
import { AuthContext } from "../contexts/AuthContext.js";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import AssessmentResultScreen from "../screens/AssessmentResultScreen";
import PracticeScreen from "../screens/PracticeScreen";


const Stack = createNativeStackNavigator();

export default function RootStack() {
  const { isLogin, setIsLogin } = useContext(AuthContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const access_token = await SecureStore.getItemAsync("access_token");
        if (access_token) {
          setIsLogin(true);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={"#3a5795"} />
        <Text>Loading ...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#FFFFFF",
        headerStyle: {
          backgroundColor: "#262626",
        },
        headerTitle: () => (
          <Image
            source={require("../assets/AdaptiveAI_Logo.png")}
            style={{
              width: 120,
              height: 60,
            }} // Apply the style
            resizeMode="contain" // Ensure it scales within the screen
          />
        ),
      }}
    >
      {isLogin ? (
        <>
          <Stack.Screen
            name="Dashboard"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="PublicModule"
            component={PublicModuleScreen}
            options={{
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="PublicModuleDetail"
            component={PublicModuleDetailScreen}
            options={{
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="Chapters"
            component={MyModuleDetail}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="Chapter"
            component={ChapterScreen}
            options={{
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="Assessment"
            component={AssessmentScreen}
            options={{
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="StartDiscussion"
            component={StartDiscussionScreen}
            options={{
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="DiscussionDetail"
            component={DiscussionDetail}
            options={{
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="AssessmentResult"
            component={AssessmentResultScreen}
            options={{
              headerShown: true,
              headerTitleAlign: "center",
              headerTintColor: "#FFFFFF",
              headerStyle: {
                backgroundColor: "#262626",
              },
              // Using the same header title as other screens
              headerTitle: () => (
                <Image
                  source={require("../assets/AdaptiveAI_Logo.png")}
                  style={{
                    width: 120,
                    height: 60,
                  }}
                  resizeMode="contain"
                />
              ),
            }}
          />
          <Stack.Screen
            name="Practice"
            component={PracticeScreen}
            options={{
              headerShown: true,
              headerTitleAlign: "center",
              headerTintColor: "#FFFFFF",
              headerStyle: {
                backgroundColor: "#262626",
              },
              headerTitle: () => (
                <Image
                  source={require("../assets/AdaptiveAI_Logo.png")}
                  style={{
                    width: 120,
                    height: 60,
                  }}
                  resizeMode="contain"
                />
              ),
            }}
          />
        </>


      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
