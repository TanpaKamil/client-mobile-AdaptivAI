
import { Text, View } from "react-native";
import GradientButton from "../buttons/GradientButton";
import { useTheme } from "../../contexts/ThemeContext";

export default function UserModuleCard({ module }) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 12,
        backgroundColor: "#303030",
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        marginBottom: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 12,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: theme.fonts.bold,
            color: theme.text,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Title
        </Text>
        <Text
          style={{
            paddingHorizontal: 8,
            backgroundColor: "#FF9500",
            borderRadius: 10,
            color: "#FFFFFF",
            fontFamily: theme.fonts.regular,
            fontSize: 10,
          }}
        >
          STATUS
        </Text>
      </View>
      {/* Description and lear button */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <Text
          style={{
            fontFamily: theme.fonts.regular,
            color: theme.text,
            fontSize: 12,
            width: 180,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. asdasdsad
          asdasd asdsad asd asdas Sed imperdiet odio eget risus lacinia
          fermentum.
        </Text>

        <View style={{ height: 42, width: 120 }}>
          <GradientButton text={"Learn Now"} />
        </View>
      </View>
      <Text
        style={{
          textAlign: "right",
          fontStyle: "italic",
          fontSize: 10,
          color: "rgba(255,255,255,0.5)",
        }}
      >
        Last Opened
      </Text>
    </View>
  );
}
