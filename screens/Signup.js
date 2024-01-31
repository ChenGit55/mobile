import {
  Button,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  View,
} from "react-native";
import styles from "../styles/CustomStyles";
import axios from "axios";
import { useState } from "react";

const Signup = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const validate = () => {
    let error = false;
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);

    if (name === "") {
      console.log("Invalid name!");
      setNameError("Please enter a valide name.");
      error = true;
    }
    if (email === "") {
      console.log("Invalid email!");
      setEmailError("Please enter a valide email.");
      error = true;
    }
    if (password === "") {
      console.log("Invalid password!");
      setPasswordError("Please enter a valide password.");
      error = true;
    }

    return !error;
  };

  const newUser = () => {
    let data = {
      name: name,
      email: email,
      password: password,
    };

    if (validate()) {
      axios({
        url: "http://192.168.1.3:3000/user/new",
        method: "POST",
        timeout: 5000,
        data: data,
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          return Promise.resolve(response);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    } else {
      console.log("erro");
    }
  };

  return (
    <SafeAreaView style={[styles.screenContainer]}>
      <KeyboardAvoidingView style={[styles.forms]}>
        <View style={[styles.formFields]}>
          <View
            style={{
              alignItems: "center",
              marginVertical: 15,
            }}
          >
            <Image
              source={require("../assets/logo.jpeg")}
              style={[styles.logo]}
            />
          </View>
          <View style={[styles.formFields]}>
            {/* <Text>Email</Text> */}
            <TextInput
              style={[styles.textInput]}
              placeholder="Your name herer"
              onChangeText={(value) => {
                setName(value);
                setNameError(null);
              }}
              errorMessage={nameError}
            ></TextInput>
          </View>

          <View style={[styles.formFields]}>
            {/* <Text>Email</Text> */}
            <TextInput
              style={[styles.textInput]}
              placeholder="Your@email.com"
              onChangeText={(value) => setEmail(value)}
              errorMessage={emailError}
            ></TextInput>
          </View>
          <View style={[styles.formFields]}>
            {/* <Text>Password</Text> */}
            <TextInput
              style={[styles.textInput]}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(value) => setPassword(value)}
              errorMessage={passwordError}
            ></TextInput>
          </View>
          <View style={[styles.formFields]}>
            <Button title="Save" onPress={newUser} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;
