import { Image, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { cardFeaturedModuleStyles } from "../../styles/componentStyles";

export default function FeatureCard({ module, onPress }) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={cardFeaturedModuleStyles.mainContainer}
    >
      <Image
        source={{
          uri: `https://image.pollinations.ai/prompt/illustrationof${module.title}?width=200&height=320&nologo=true`,
        }}
        style={cardFeaturedModuleStyles.imgSize}
      />
      <Text
        style={[
          {
            color: theme.text,
            fontFamily: theme.fonts.regular,
          },
          cardFeaturedModuleStyles.text,
        ]}
      >
        {module.title} {module._id}
      </Text>
    </TouchableOpacity>
  );
}
