import { Image, Text, View } from "react-native";
import GradientButton from "./buttons/GradientButton";
import { currentModuleStyles } from "../styles/componentParentStyles";

import { useTheme } from "../contexts/ThemeContext";
import { useModules } from "../contexts/ModuleContext";
import { useEffect, useState } from "react";
import axios from "../config/axiosInstance";
import { useNavigation } from "@react-navigation/native";

export default function CurrentModule() {
  const { theme } = useTheme();
  const [currentModule, setCurrentModule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const navigation = useNavigation();

  async function fetchCurrentModule() {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/modules/dashboard",
      });
      setCurrentModule(data.data.modules);
      console.log(data.modules);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCurrentModule();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (currentModule.length === 0) {
    return <><View></View></>;
  }

  return (
    <View style={currentModuleStyles.mainContainer}>
      <View style={currentModuleStyles.rowContainer}>
        <Image
          source={{
            uri: "https://image.pollinations.ai/prompt/illustrationof" + currentModule[page].title + "?width=200&height=320&nologo=true",
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
              width: 200,
            }}
          >
            {currentModule[page].title}
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
          {currentModule[page].completedChapters} / {currentModule[page].totalChapters} Chapters
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
                width: `${(currentModule[page].completedChapters / currentModule[page].totalChapters) * 100}%`,
              },
              currentModuleStyles.barSize,
            ]}
          />
        </View>
        <View style={currentModuleStyles.btnSize}>
          <GradientButton text={"Continue Learning"} onPress={() => navigation.navigate("")}/>
        </View>
      </View>
    </View>
  );
}
