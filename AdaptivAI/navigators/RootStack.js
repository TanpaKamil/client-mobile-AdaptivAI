import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabNavigator from "./TabNavigator";
import PublicModuleScreen from "../screens/PublicModuleScreen";
import { Image } from "react-native";
import PublicModuleDetailScreen from "../screens/PublicModuleDetail";
import ChapterScreen from "../screens/ChapterScreen";
import MyModuleDetail from "../screens/MyModuleDetail";
import AssessmentScreen from "../screens/AssessmentScreen";
import StartDiscussionScreen from "../screens/StartDiscussion.js";
import DiscussionDetail from "../screens/DiscussionDetail.js";

const Stack = createNativeStackNavigator();
export default function RootStack() {
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
    </Stack.Navigator>
  );
}
