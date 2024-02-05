import {
  Button,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles/CustomStyles";
import axios from "axios";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [authError, setAuthError] = useState(false);

  let data = {
    email: email,
    password: password,
  };

  const loginHandle = async () => {
    try {
      const response = await axios({
        url: "http://192.168.1.3:3000/user/login",
        method: "POST",
        timeout: 5000,
        data: data,
        headers: { Accept: "application/json" },
      });
      console.log(response.status);
      AsyncStorage.setItem("TOKEN", response.data.access_token);
      AsyncStorage.setItem("NAME", response.data.name);
      AsyncStorage.setItem("EMAIL", response.data.email);

      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
      setAuthError(false);
      return await Promise.resolve(response);
    } catch (error) {
      setAuthError(true);
      console.log(error, "handle error");
    }
  };

  const tokenLogin = async (value) => {
    try {
      const response = await axios({
        url: "http://192.168.1.3:3000/user/token-login",
        method: "POST",
        timeout: 5000,
        data: value,
        headers: { Accept: "application/json" },
      });
      AsyncStorage.setItem("TOKEN", response.data.access_token);
      AsyncStorage.setItem("NAME", response.data.name);
      AsyncStorage.setItem("EMAIL", response.data.email);
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
      console.log(response.data.access_token, "token login");
      return response;
    } catch (error) {
      console.log(response.status, "response error");
      throw error;
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("TOKEN").then((token) => {
      if (token) {
        let data = {
          token: token,
        };
        tokenLogin(data);
      } else {
        console.log(token, "token error");
      }
    });
  }, []);

  const signUpHandle = async () => {
    navigation.navigate("Signup");
  };
  return (
    <SafeAreaView style={[styles.screenContainer]}>
      <KeyboardAvoidingView style={[styles.forms]}>
        <View style={[styles.formFields]}>
          <View style={{ alignItems: "center", marginVertical: 15 }}>
            <Image
              source={require("../assets/logo.jpeg")}
              style={[styles.logo]}
            />
          </View>
          {authError && (
            <Text style={{ color: "red" }}>Invalid email or password!</Text>
          )}
          <View style={[styles.formFields]}>
            <TextInput
              style={[styles.textInput]}
              placeholder="Your@email.com"
              onChangeText={(value) => {
                setEmail(value);
              }}
            ></TextInput>
          </View>
          <View style={[styles.formFields]}>
            <TextInput
              style={[styles.textInput]}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(value) => {
                setPassword(value);
              }}
            ></TextInput>
          </View>
          <View style={[styles.formFields]}>
            <Button title="Login" onPress={loginHandle} />
          </View>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={signUpHandle}
          >
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Login;
