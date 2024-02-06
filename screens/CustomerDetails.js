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
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { deleteCustomer, updateCustomer } from "../services/ApiService";

const UpdateCustomer = ({ navigation }) => {
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
      Alert.alert("Confirm", "Are you sure you want to update customer?", [
        {
          text: "Cancel",
        },
        {
          text: "OK",
          onPress: () => {
            const response = updateCustomer(customer.id, newCostomerData);
            navigation.navigate("CustomersList");
            return Promise.resolve(response);
          },
        },
      ]);
    } catch (error) {
      return await Promise.reject(error);
    }
  };

  const handleDeleteCustomer = async () => {
    try {
      Alert.alert("Confirm", "Are you sure you want to delete customer?", [
        {
          text: "Cancel",
        },
        {
          text: "Yes, delete it.",
          onPress: () => {
            const response = deleteCustomer(customer.id);
            navigation.navigate("CustomersList");
            return Promise.resolve(response);
          },
        },
      ]);
    } catch (error) {}
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
        <View style={{ marginTop: 10 }}>
          <Button title="Delete" onPress={handleDeleteCustomer} color={"red"} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UpdateCustomer;
