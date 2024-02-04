import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },

  forms: {
    padding: 20,
    width: "100%",
    justifyContent: "space-evenly",
  },

  formFields: {
    marginVertical: 5,
  },

  logo: {
    width: 200,
    height: 200,
    padding: 10,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "gray",
  },

  textInput: {
    borderWidth: 1,
    height: 45,
    borderRadius: 10,
    padding: 10,
  },
});

export default styles;
