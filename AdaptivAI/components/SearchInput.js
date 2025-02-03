import { TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SearchBar() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 60,
        height: 50,
        backgroundColor: "#FFFFFF",
        gap: 10,
      }}
    >
      <Ionicons name="search" size={24} color="gray" />
      <TextInput
        placeholder="Search"
        style={{
          width: "100%",
          height: 50,
          paddingRight: 50,
        }}
      />
    </View>
  );
}
