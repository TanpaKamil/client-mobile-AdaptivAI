import { Text, View } from "react-native";

export default function Divider() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 2,
      }}
    >
      <View
        style={{
          width: "40%",
          height: 1,
          backgroundColor: "white",
          margin: 20,
        }}
      />
      <Text style={{ fontSize: 16, color: "white" }}>Or</Text>
      <View
        style={{
          width: "40%",
          height: 1,
          backgroundColor: "white",
          margin: 20,
        }}
      />
    </View>
  );
}
