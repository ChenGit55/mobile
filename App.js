import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Main from "./screens/Main";
import Signup from "./screens/Signup";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function defineInterceptor() {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      return new Promise((resolve, reject) => {
        const originalReq = err.config;
        if (err.response.status == 401 && err.config && !err.config._retry) {
          originalReq._retry = true;
          AsyncStorage.getItem("TOKEN").then((token) => {
            let res = axios
              .put("http://192.168.1.3:3000/token/refresh", { oldToken: token })
              .then((res) => {
                AsyncStorage.setItem("TOKEN", res.data.access_token);
                originalReq.headers[
                  "Authorization"
                ] = `Bearer ${res.data.access_token}`;
                return axios(originalReq);
              });
            resolve(res);
          });
        } else {
          reject(err);
        }
      });
    }
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  defineInterceptor();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#ffff" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
