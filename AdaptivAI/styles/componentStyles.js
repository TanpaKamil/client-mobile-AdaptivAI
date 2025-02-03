import { StyleSheet } from "react-native";

export const ButtonStyles = StyleSheet.create({
  buttonShape: {
    display: "flex",
    height: "100%",
    borderWidth: 1,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  gradientButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export const FormInputStyles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    paddingLeft: 20,
    height: 50,
    borderWidth: 1,
    borderRadius: 40,
    paddingLeft: 12,
    backgroundColor: "#FFFFFF",
  },
  inputText: {
    flex: 1,
    marginHorizontal: 10,
  },
});
