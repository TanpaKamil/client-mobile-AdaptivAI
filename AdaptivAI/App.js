import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./contexts/ThemeContext"; // Import ThemeProvider
import RootStack from "./navigators/RootStack";
import TabNavigator from "./navigators/TabNavigator";

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
