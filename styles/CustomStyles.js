import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
  },

  forms: {
    padding: 20,
    width: "100%",
    justifyContent: "space-evenly",
  },

  formFields: {
    marginVertical: 15,
  },

  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: "aqua",
  },

  textInput: {
    borderWidth: 1,
    height: 45,
    borderRadius: 10,
    padding: 10,
  },
});

export default styles;
