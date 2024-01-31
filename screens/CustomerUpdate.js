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

const CustomerUpdate = () => {
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CustomerUpdate;
