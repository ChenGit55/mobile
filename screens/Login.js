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
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, tokenLogin } from "../services/ApiService";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [authError, setAuthError] = useState(false);

  let data = {
    email: email,
    password: password,
  };

  const storeLocalData = async (response) => {
    AsyncStorage.setItem("TOKEN", response.data.access_token);
    AsyncStorage.setItem("NAME", response.data.name);
    AsyncStorage.setItem("EMAIL", response.data.email);
  };

  const loginHandle = async () => {
    try {
      const response = await login(data);
      storeLocalData(response);
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
      setAuthError(false);
      return await Promise.resolve(response);
    } catch (error) {
      setAuthError(true);
    }
  };

  const tokenLoginHandle = async (token) => {
    try {
      const response = await tokenLogin(token);
      storeLocalData(response);
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("TOKEN");
        if (token) {
          let data = {
            token: token,
          };
          await tokenLoginHandle(data);
        } else {
          console.log("Token not found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error while retrieving token from AsyncStorage:", error);
      }
    };
    checkToken();
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
          <Text
            style={{
              fontSize: 50,
              fontWeight: "800",
              color: "navy",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Study App
          </Text>
          {authError && (
            <Text style={{ color: "red" }}>Invalid email or password!</Text>
          )}
          <View style={[styles.formFields]}>
            <TextInput
              style={[styles.textInput]}
              placeholder="Your@email.com"
              onChangeText={(value) => {
                setEmail(value);
                setAuthError(false);
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
