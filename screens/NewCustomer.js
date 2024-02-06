import {
  Alert,
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import styles from "../styles/CustomStyles";
import { useState } from "react";
import { newCustomer } from "../services/ApiService";

const NewCostumer = ({ navigation }) => {
  const [customerData, setCustomerData] = useState({
    name: null,
    email: null,
    cpf: null,
  });

  const saveCustomer = async () => {
    newCustomer(customerData);

    Alert.alert("Sucess", "Customer created!", [
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("CustomersList");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.screenContainer]}>
      <KeyboardAvoidingView style={[styles.forms]}>
        <View style={[styles.formFields]}>
          <Text>Name</Text>
          <TextInput
            style={[styles.textInput]}
            onChangeText={(value) => {
              setCustomerData((data) => ({
                ...data,
                name: value.trim(),
              }));
            }}
          ></TextInput>
        </View>
        <Text>Email</Text>
        <View style={[styles.formFields]}>
          <TextInput
            style={[styles.textInput]}
            onChangeText={(value) => {
              setCustomerData((data) => ({
                ...data,
                email: value.trim(),
              }));
            }}
          ></TextInput>
        </View>
        <Text>CPF</Text>
        <View style={[styles.formFields]}>
          <TextInput
            style={[styles.textInput]}
            onChangeText={(value) => {
              setCustomerData((data) => ({
                ...data,
                cpf: value.trim(),
              }));
            }}
          ></TextInput>
        </View>
        <Button title="Save" onPress={saveCustomer} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewCostumer;
