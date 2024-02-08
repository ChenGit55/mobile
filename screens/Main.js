import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
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
      setOptionsIconColor("#0381ab");
    } else {
      setOptionsIconColor("#3b3b3b");
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
          AsyncStorage.clear().then(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          });
        },
      },
    ]);
  };

  return (
    <>
      <Modal transparent={true} visible={optionsListVisible}>
        <TouchableWithoutFeedback onPress={() => setOptionsListVisible(false)}>
          <View style={[screenStyles.optContainer]}>
            <View style={screenStyles.optMenu}>
              <Pressable
                style={({ pressed }) => [
                  screenStyles.optButton,
                  {
                    backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
                  },
                ]}
                onPress={profileHandle}
              >
                <FontAwesome6Icon
                  name="user"
                  size={15}
                  style={screenStyles.optButtonIcon}
                />
                <Text style={screenStyles.optButtonText}>Profile</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  screenStyles.optButton,
                  {
                    backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
                  },
                ]}
                onPress={logoutHandle}
              >
                <FontAwesome6Icon
                  name="right-from-bracket"
                  size={15}
                  style={screenStyles.optButtonIcon}
                />
                <Text style={screenStyles.optButtonText}>Logout</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: { height: 80 },

          tabBarActiveTintColor: "#8ce2ff",
          tabBarInactiveTintColor: "#3b3b3b",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => {
                setOptionsListVisible(true);
              }}
            >
              <FontAwesome6Icon
                name="gear"
                color={optionsIconColor}
                size={20}
              />
            </TouchableOpacity>
          ),
          tabBarStyle: {
            paddingBottom: 10,
            borderTopWidth: 0,
            shadowColor: 0,
            height: 60,
            backgroundColor: "#0381ab",
          },
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
            tabBarIconStyle: {
              color: "red",
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
}

const screenStyles = StyleSheet.create({
  optContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginTop: 30,
    marginRight: 30,
  },

  optMenu: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0381ab",
    paddingVertical: 10,
  },

  optButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    paddingHorizontal: 15,
    marginRight: 15,
  },
  optButtonIcon: {
    width: 25,
    color: "#0381ab",
  },
  optButtonText: {
    fontSize: 16,
    color: "#0381ab",
  },
});
