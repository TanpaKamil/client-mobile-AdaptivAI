import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./contexts/ThemeContext"; // Import ThemeProvider
import RootStack from "./navigators/RootStack";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}
