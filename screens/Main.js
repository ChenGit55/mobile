import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Products from "./Product";
import Customers from "./Customers";
import Order from "./Order";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarStyle: { marginBottom: 20 },
        tabBarIcon: () => null,
      }}
    >
      <Tab.Screen name="Customers" component={Customers} />
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Products" component={Products} />
    </Tab.Navigator>
  );
}

export default function Main() {
  return <MyTabs />;
}
