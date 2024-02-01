import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import styles from "../styles/CustomStyles";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";

const CustomerUpdate = ({ navigation }) => {
  const route = useRoute();
  const { customer } = route.params;

  const [newName, setNewName] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newCpf, setNewCpf] = useState(null);

  if (newName === null) {
    setNewName(customer.name);
  }

  if (newEmail === null) {
    setNewEmail(customer.email);
  }

  if (newCpf === null) {
    setNewCpf(customer.cpf);
  }

  let newCostomerData = {
    name: newName,
    email: newEmail,
    cpf: newCpf,
  };

  const saveNewCustomer = async () => {
    try {
      const response = await axios({
        url: `http://192.168.1.3:3000/client/update/${customer.id}`,
        method: "PUT",
        timeout: 5000,
        data: newCostomerData,
        headers: { Accept: "application/json" },
      });
      navigation.navigate("Customers");
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
    }
  };

  return (
    <SafeAreaView style={[styles.screenContainer]}>
      <KeyboardAvoidingView style={[styles.forms]}>
        <View style={[styles.formFields]}>
          <Text>Name</Text>
          <TextInput
            style={[styles.textInput]}
            value={newName}
            onChangeText={(value) => {
              setNewName(value);
            }}
          ></TextInput>
        </View>
        <Text>Email</Text>
        <View style={[styles.formFields]}>
          <TextInput
            style={[styles.textInput]}
            value={newEmail}
            onChangeText={(value) => {
              setNewEmail(value);
            }}
          ></TextInput>
        </View>
        <Text>CPF</Text>
        <View style={[styles.formFields]}>
          <TextInput
            style={[styles.textInput]}
            value={newCpf}
            onChangeText={(value) => {
              setNewCpf(value);
            }}
          ></TextInput>
        </View>
        <Button title="Save" onPress={saveNewCustomer} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CustomerUpdate;
