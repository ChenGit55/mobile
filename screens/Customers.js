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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { listCustomer } from "../services/ApiService";
import UpdateCustomer from "./CustomerDetails";
import NewCostumer from "./NewCustomer";

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

  const plusHandle = async () => {
    navigation.navigate("NewCustomer");
  };
  return (
    <SafeAreaView
      style={[styles.screenContainer, { justifyContent: "flex-start" }]}
    >
      <View
        style={{
          width: "100%",
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
              padding: 3,
              paddingHorizontal: 15,
              flexDirection: "row",
              borderBlockColor: "green",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "green",
            }}
            onPress={plusHandle}
          >
            <Text
              style={{
                fontWeight: "300",
                fontSize: 15,
                color: "white",
                marginRight: 5,
              }}
            >
              New Customer
            </Text>
            <FontAwesome6Icon name="plus" size={10} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ height: "90%", backgroundColor: "white" }}>
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
      </View>
    </SafeAreaView>
  );
};

const CustomersStack = createNativeStackNavigator();

function CustomersStackScreen() {
  return (
    <CustomersStack.Navigator screenOptions={{ headerShown: false }}>
      <CustomersStack.Screen name="CustomersList" component={Customers} />
      <CustomersStack.Screen name="NewCustomer" component={NewCostumer} />
      <CustomersStack.Screen name="CustomerUpdate" component={UpdateCustomer} />
    </CustomersStack.Navigator>
  );
}

export default CustomersStackScreen;
