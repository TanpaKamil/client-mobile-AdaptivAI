import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./contexts/ThemeContext"; // Import ThemeProvider
import RootStack from "./navigators/RootStack";
import TabNavigator from "./navigators/TabNavigator";
import PublicModuleScreen from "./screens/PublicModuleScreen";
import StartDiscussion from "./screens/StartDiscussion.js";

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
          < StartDiscussion />
      </NavigationContainer>
    </ThemeProvider>
  );
}
