import { Image, Text, View } from "react-native";
import GradientButton from "./buttons/GradientButton";
import { useTheme } from "../contexts/ThemeContext";
import { currentModuleStyles } from "../styles/componentParentStyles";

export default function CurrentModule() {
  const { theme } = useTheme();
  return (
    <View style={currentModuleStyles.mainContainer}>
      <View style={currentModuleStyles.rowContainer}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHC_8-EMZFLsoGfcdsw3cR7IS3DmOf7tgoJg&s",
          }}
          style={currentModuleStyles.imgSize}
        />
        <View style={currentModuleStyles.columnContainer}>
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
      <View>
        <Text
          style={[
            {
              color: theme.text,
              fontFamily: theme.fonts.regular,
            },
            currentModuleStyles.presentationText,
          ]}
        >
          85%
        </Text>
        <View
          style={[
            {
              backgroundColor: "#606060",
            },
            currentModuleStyles.barSize,
          ]}
        >
          <View
            style={[
              {
                backgroundColor: "#FBA459",
                width: "85%",
              },
              currentModuleStyles.barSize,
            ]}
          />
        </View>
        <View style={currentModuleStyles.btnSize}>
          <GradientButton text={"Continue Learning"} />
        </View>
      </View>
    </View>
  );
}
