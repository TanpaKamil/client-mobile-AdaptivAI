import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MyModuleScreen from "../screens/MyModuleScreen";
import DiscussionScreen from "../screens/DiscussionScreen";
import { View } from "react-native";
import GenerateModuleScreen from "../screens/GenerateModuleScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "MyModule") {
            iconName = focused ? "newspaper" : "newspaper-outline";
          } else if (route.name === "Discussion") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Generate") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }

          return <Ionicons name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: "#FBA459",
        tabBarInactiveTintColor: "#FFFFFF",
        // headerBackground: "#262626",
        tabBarShowLabel: () => {
            if (route.name === "Generate") {
                return false
            }}
        ,
        tabBarBackground: () => {
            return <View style={{width: "100%", height:"100%", backgroundColor: "#262626" }} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MyModule" component={MyModuleScreen} />
      <Tab.Screen name="Generate" component={GenerateModuleScreen} />
      <Tab.Screen name="Discussion" component={DiscussionScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
