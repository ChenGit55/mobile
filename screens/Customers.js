import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles/CustomStyles";
import axios from "axios";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomerUpdate from "./CustomerUpdate";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Customers = ({ navigation }) => {
  const [customers, setCustomers] = useState(null);

  const getCustomersData = async () => {
    token = await AsyncStorage.getItem("TOKEN");
    try {
      const response = await axios.get("http://192.168.1.3:3000/client/list", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      setCustomers(response.data.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error("Erro na chamada Axios", error);
    }
  };

  getCustomersData();

  const editHandle = async (customer) => {
    navigation.navigate("CustomerUpdate", { customer });
  };

  return (
    <SafeAreaView style={[styles.screenContainer]}>
      <View
        style={{
          width: "100%",
        }}
      >
        <FlatList
          data={customers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 20,
                marginHorizontal: 20,
                marginVertical: 5,
                padding: 20,
              }}
              onPress={() => editHandle(item)}
            >
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text>{item.cpf}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const CustomersStack = createNativeStackNavigator();

function CustomersStackScreen() {
  return (
    <CustomersStack.Navigator screenOptions={{ headerShown: false }}>
      <CustomersStack.Screen name="Customers List" component={Customers} />
      <CustomersStack.Screen name="CustomerUpdate" component={CustomerUpdate} />
    </CustomersStack.Navigator>
  );
}

export default CustomersStackScreen;
