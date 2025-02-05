import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ModuleProvider } from "./contexts/ModuleContext";
import { DiscussionProvider } from "./contexts/DiscussionContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { ErrorProvider } from "./contexts/ErrorContext";
import RootStack from "./navigators/RootStack";

export default function App() {
 return (
   <ErrorProvider>
     <LoadingProvider>
       <ThemeProvider>
         <AuthProvider>
           <ModuleProvider>
             <DiscussionProvider>
               <NavigationContainer>
                 <RootStack />
               </NavigationContainer>
             </DiscussionProvider>
           </ModuleProvider>
         </AuthProvider>
       </ThemeProvider>
     </LoadingProvider>
   </ErrorProvider>
 );
}