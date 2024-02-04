import {
  Alert,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Products from "./Product";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import Order from "./Order";
import CustomersStackScreen from "./Customers";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

export default function Main({ navigation }) {
  const [optionsListVisible, setOptionsListVisible] = useState(false);
  const [optionsIconColor, setOptionsIconColor] = useState("gray");

  useEffect(() => {
    if (optionsListVisible) {
      setOptionsIconColor("blue");
    } else {
      setOptionsIconColor("gray");
    }
  }, [optionsListVisible]);

  const profileHandle = () => {
    navigation.navigate("Profile"), setOptionsListVisible(false);
  };

  const logoutHandle = () => {
    Alert.alert("Confirm", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          AsyncStorage.setItem("TOKEN", "").then(
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          );
        },
      },
    ]);
  };

  return (
    <>
      <Modal transparent={true} visible={optionsListVisible}>
        <TouchableWithoutFeedback onPress={() => setOptionsListVisible(false)}>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              marginTop: 30,
              marginRight: 30,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                borderWidth: 1,
                paddingVertical: 10,
              }}
            >
              <Pressable onPress={profileHandle}>
                <Text
                  style={{
                    marginHorizontal: 10,
                    padding: 5,
                  }}
                >
                  Profile
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
                  },
                ]}
                onPress={logoutHandle}
              >
                <View
                  style={{
                    flexDirection: "row",
                    padding: 5,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,

                    marginHorizontal: 10,
                  }}
                >
                  <Text>Logout</Text>
                  <FontAwesome6Icon
                    name="right-from-bracket"
                    size={15}
                    style={{ marginLeft: 10, marginTop: 2 }}
                  />
                </View>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: "center",

          tabBarStyle: {
            paddingBottom: 10,
            borderTopWidth: 0,
            shadowColor: 0,
          },
          headerStyle: { height: 80 },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => {
                setOptionsListVisible(true),
                  console.log("optionsListVisible:", optionsListVisible);
              }}
            >
              <FontAwesome6Icon
                name="gear"
                color={optionsIconColor}
                size={20}
              />
            </TouchableOpacity>
          ),
        }}
      >
        <Tab.Screen
          name="Customers"
          component={CustomersStackScreen}
          options={{
            tabBarLabel: "Customers",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6Icon name="people-group" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Order"
          component={Order}
          options={{
            tabBarLabel: "Order",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6Icon name="shop" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Products"
          component={Products}
          options={{
            tabBarLabel: "Products",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6Icon name="list" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
