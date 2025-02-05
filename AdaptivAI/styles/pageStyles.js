import { StyleSheet } from "react-native";

export const MyModuleStyles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 25,
  },
  btnGenerate: {
    display: "flex",
    marginTop: 30,
    height: 40,
    width: "100%",
    justifyContent: "center",
  },
  columnContainer: {
    marginVertical: 20,
    flexDirection: "column",
    gap: 12,
  },
});

export const MyModuleDetailStyles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 20,
  },
});

export const ProgressCardStyles = StyleSheet.create({
  containerSize: {
    marginTop: 40,
    padding: 12,
    borderRadius: 15,
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign:"center"
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#FBA459",
    color: "#FFFFFF",
    fontSize: 10,
    textAlign: "left",
  },
  badgeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  lastAccessText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: 200,
    marginBottom: 3,
  },
  scoreContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    marginBottom: 3,
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: 200,
  },
  valueText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  progressText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  progressContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export const flashCardStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  flashcard: {
    width: 250,
    minHeight: 200,
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FBA459",
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
  },
  flashcardText: {
    textAlign: "center",
    fontSize: 12,
  },
  orderBar: {
    backgroundColor: "#FFFFFF",
    height: 20,
    borderRadius: 20,
    marginVertical: 20,
    display: "flex",
  },
  orderText: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: "#2D2784",
  },
  orderProgress: {
    backgroundColor: "#FBA459",
    height: 20,
    borderRadius: 20,
  }
});
