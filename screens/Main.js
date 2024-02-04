import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Products from "./Product";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import Order from "./Order";
import CustomersStackScreen from "./Customers";

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
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
          <FontAwesome6Icon
            name="gear"
            color={"grey"}
            size={20}
            style={{ marginRight: 20 }}
          />
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
  );
}
