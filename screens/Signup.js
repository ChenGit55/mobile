import {
  Button,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  View,
  Text,
} from "react-native";
import styles from "../styles/CustomStyles";
import axios from "axios";
import { useState } from "react";

const Signup = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const validate = () => {
    let error = false;
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);

    if (name === "" || name === null) {
      console.log("Invalid name!");
      setNameError("Please enter a valide name.");
      error = true;
    }
    if (email === "" || email === null) {
      console.log("Invalid email!");
      setEmailError("Please enter a valide email.");
      error = true;
    }
    if (password === "" || password === null || password.includes(" ")) {
      console.log("Invalid password!");
      setPasswordError("Please enter a valide password.");
      error = true;
    }
    console.log(!error, name);

    return !error;
  };

  const newUser = () => {
    if (validate()) {
      let data = {
        name: name,
        email: email,
        password: password,
      };

      signUp(data)
        .then((response) => {
          console.log("Success");
        })
        .catch((error) => {
          console.log("Error");
        });
    }
  };

  const signUp = async (data) => {
    try {
      const response = await axios({
        url: "http://192.168.1.3:3000/user/new",
        method: "POST",
        timeout: 5000,
        data: data,
        headers: { Accept: "application/json" },
      });
      return await Promise.resolve(response);
    } catch (error) {
      return await Promise.reject(error);
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
            {/* <Text>Name</Text> */}
            <TextInput
              style={[styles.textInput]}
              placeholder="Your name herer"
              onChangeText={(value) => {
                setName(value.trim());
                setNameError(null);
              }}
            ></TextInput>
            {nameError !== null && (
              <Text style={{ color: "red" }}>{nameError}</Text>
            )}
          </View>

          <View style={[styles.formFields]}>
            {/* <Text>Email</Text> */}
            <TextInput
              style={[styles.textInput]}
              placeholder="Your@email.com"
              onChangeText={(value) => {
                setEmail(value.trim());
                setEmailError(null);
              }}
            ></TextInput>
            {emailError !== null && (
              <Text style={{ color: "red" }}>{emailError}</Text>
            )}
          </View>
          <View style={[styles.formFields]}>
            {/* <Text>Password</Text> */}
            <TextInput
              style={[styles.textInput]}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(value) => {
                setPassword(value);
                setPasswordError(null);
              }}
            ></TextInput>
            {passwordError !== null && (
              <Text style={{ color: "red" }}>{passwordError}</Text>
            )}
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
