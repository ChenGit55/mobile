import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Main from "./screens/Main";
import Signup from "./screens/Signup";
import { StatusBar } from "expo-status-bar";
import Profile from "./screens/Profile";
import { defineInterceptor, tokenInterceptor } from "./services/ApiService";

const Stack = createNativeStackNavigator();
export default function App() {
  // defineInterceptor();
  tokenInterceptor();
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
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: true, headerLeft: () => "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
