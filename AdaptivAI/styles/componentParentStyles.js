import { StyleSheet } from "react-native";

export const currentModuleStyles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    marginTop: 20,
    backgroundColor: "#303030",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#606060",
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  imgSize: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  barSize: {
    height: 10,
    borderRadius: 5,
  },
  btnSize: {
    marginTop: 15,
    height: 40,
  },
  presentationText: {
    fontSize: 12,
    textAlign: "right",
    marginBottom: 5,
  },
});

export const dashBoardProfileStyles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imgSize: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
});

export const discussionFeaturedStyles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    marginBottom: 30,
  },
  cardContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    padding: 12,
    backgroundColor: "#303030",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#606060",
    gap: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export const recommededModuleStyles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
  },
  cardContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
});

export const featuredModuleStyles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
  },
  titleContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  featureCardContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 10,
  },
});
