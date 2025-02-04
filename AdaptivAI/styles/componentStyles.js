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
  formContainer: {
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 60,
    gap: 20,
    width: 280,
  },
  btn: {
    width: 280,
    height: 50,
    display: "flex",
  },
});

export const CardChapterStyles = StyleSheet.create({
  statusBadge: {
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#FBA459",
    color: "#FFFFFF",
    fontSize: 10,
  },
  chapterContainer: {
    backgroundColor: "#303030",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    width: 160,
    padding: 10,
  },
  titleText: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: "bold",
  },
  orderText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  containerSpace: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export const CardDiscussionStyles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
  },
  imgSize: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  seenText: {
    color: "rgba(255, 255, 255, 0.25)",
    fontSize: 12,
  },
  TitleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export const cardFeaturedModuleStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#303030",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#606060",
    width: 160,
    padding: 10,
  },
  imgSize: {
    height: 80,
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    marginTop: 5,
  },
});

export const cardModuleStyles = StyleSheet.create({
  gradientContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  imgSize: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  subscriberContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
    padding: 8,
    borderRadius: 12,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  subscriberText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 12,
  },
});

export const cardUserModuleStyles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 12,
    backgroundColor: "#303030",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginBottom: 20,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statusBadge: {
    paddingHorizontal: 8,
    backgroundColor: "#FF9500",
    borderRadius: 10,
    color: "#FFFFFF",
    fontSize: 10,
  },
  rowBetweenContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  descriptionText: {
    fontSize: 12,
    width: 180,
  },
  btnSize: {
    height: 42,
    width: 120,
  },
  lastOpenText: {
    textAlign: "right",
    fontStyle: "italic",
    fontSize: 10,
    color: "rgba(255,255,255,0.5)",
  },
});

export const searchInputStyles = StyleSheet.create({
  mainContainer: {
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
  },
  textInput: {
    width: "100%",
    height: 50,
    paddingRight: 50,
  },
});

export const tranparentBtnStyles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderColor: "#FBA459",
    borderWidth: 1,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
