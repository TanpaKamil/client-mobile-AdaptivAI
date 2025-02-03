import { Image, Text, View } from "react-native";
import GradientButton from "./buttons/GradientButton";
import { useTheme } from "../contexts/ThemeContext";

export default function CurrentModule() {
    const { theme } = useTheme();
  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
        backgroundColor: "#303030",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#606060",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHC_8-EMZFLsoGfcdsw3cR7IS3DmOf7tgoJg&s",
          }}
          style={{ width: 40, height: 40, borderRadius: 5 }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontFamily: theme.fonts.regular,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Current Module
          </Text>
          <Text
            style={{
              color: theme.text,
              fontFamily: theme.fonts.regular,
              fontSize: 12,
            }}
          >
            Introduction to AI
          </Text>
        </View>
      </View>
      <View style={{}}>
        <Text
          style={{
            color: theme.text,
            fontFamily: theme.fonts.regular,
            fontSize: 12,
            textAlign: "right",
          }}
        >
          85%
        </Text>
        <View
          style={{
            backgroundColor: "#606060",
            height: 10,
            borderRadius: 5,
            marginTop: 5,
          }}
        >
          <View
            style={{
              backgroundColor: "#FBA459",
              height: 10,
              width: "85%",
              borderRadius: 5,
            }}
          />
        </View>
        <View
          style={{
            marginTop: 15,
            height: 40,
          }}
        >
          <GradientButton text={"Continue Learning"} />
        </View>
      </View>
    </View>
  );
}
