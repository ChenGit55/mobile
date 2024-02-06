import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles/CustomStyles";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomerUpdate from "./CustomerUpdate";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { listCustomer } from "../services/ApiService";

const Customers = ({ navigation }) => {
  const [customers, setCustomers] = useState(null);

  const getCustomersData = async () => {
    token = await AsyncStorage.getItem("TOKEN");
    try {
      const response = await listCustomer(token);
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
          marginTop: 40,
          padding: 20,
        }}
      >
        <View
          style={{
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderWidth: 1,
              borderBlockColor: "green",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome6Icon name="plus" size={30} color="green" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={customers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 20,
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
