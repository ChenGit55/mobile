import {
  Button,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  Alert,
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

  const [userData, setUserData] = useState({
    name: null,
    email: null,
    password: null,
  });

  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const validate = () => {
    let error = false;
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);

    if (userData.name === "" || userData.name === null) {
      console.log("Invalid name!");
      setNameError("Please enter a valide name.");
      error = true;
    }
    if (userData.email === "" || userData.email === null) {
      console.log("Invalid email!");
      setEmailError("Please enter a valide email.");
      error = true;
    }
    if (
      userData.password === "" ||
      userData.password === null ||
      userData.password.includes(" ")
    ) {
      console.log("Invalid password!");
      setPasswordError("Please enter a valide password.");
      error = true;
    }

    return !error;
  };

  const signUp = async (userData) => {
    if (validate()) {
      try {
        const response = await axios({
          url: "http://192.168.1.3:3000/user/new",
          method: "POST",
          timeout: 5000,
          data: userData,
          headers: { Accept: "application/json" },
        });
        console.log(response.data);
        if (response.data.success) {
          console.log("User created");
          Alert.alert("Success!", "User registration complete", [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Login");
              },
            },
          ]);
        } else {
          console.log("Failed to creat user");
          setEmailError("Email already takken.");
        }
      } catch (error) {}
    }
  };

  const saveUser = () => {
    signUp(userData);
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
                setUserData((prevData) => ({
                  ...prevData,
                  name: value.trim(),
                }));
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
                setUserData((prevData) => ({
                  ...prevData,
                  email: value.trim(),
                }));
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
                setUserData((prevData) => ({ ...prevData, password: value }));
                setPasswordError(null);
              }}
            ></TextInput>
            {passwordError !== null && (
              <Text style={{ color: "red" }}>{passwordError}</Text>
            )}
          </View>
          <View style={[styles.formFields]}>
            <Button title="Save" onPress={saveUser} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;
