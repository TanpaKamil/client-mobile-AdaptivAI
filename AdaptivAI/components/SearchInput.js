import { TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { searchInputStyles } from "../styles/componentStyles";

export default function SearchBar() {
  return (
    <View style={searchInputStyles.mainContainer}>
      <Ionicons name="search" size={24} color="gray" />
      <TextInput placeholder="Search" style={searchInputStyles.textInput} />
    </View>
  );
}
