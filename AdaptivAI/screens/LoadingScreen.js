import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useLoading } from '../contexts/LoadingContext';

export default function LoadingScreen() {
  const { theme } = useTheme();
  const { loadingMessage } = useLoading();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ActivityIndicator size="large" color={theme.gradientColors[0]} />
      {loadingMessage && (
        <Text style={[styles.message, { 
          color: theme.text,
          fontFamily: theme.fonts.regular 
        }]}>
          {loadingMessage}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 999,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});