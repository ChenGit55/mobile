import {
  FlatList,
  SafeAreaView,
  StyleSheet,
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
        }}
      >
        <View style={screenStyles.newCustomerButtonContainer}>
          <TouchableOpacity
            style={screenStyles.newCustomerButton}
            onPress={plusHandle}
          >
            <Text style={screenStyles.newCustomerButtonText}>New Customer</Text>
            <FontAwesome6Icon name="plus" size={10} color="green" />
          </TouchableOpacity>
        </View>
        <View style={screenStyles.customerListContainer}>
          <FlatList
            data={customers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={screenStyles.customerList}
                onPress={() => editHandle(item)}
              >
                <Text style={screenStyles.customerListText}>{item.name}</Text>
                <Text style={screenStyles.customerListText}>{item.email}</Text>
                <Text style={screenStyles.customerListText}>{item.cpf}</Text>
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

const screenStyles = StyleSheet.create({
  newCustomerButtonContainer: {
    alignItems: "flex-end",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  newCustomerButton: {
    padding: 3,
    paddingHorizontal: 15,
    paddingBottom: 5,
    borderWidth: 2,
    borderColor: "green",
    flexDirection: "row",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "green",
  },
  newCustomerButtonText: {
    fontWeight: "700",
    fontSize: 15,
    color: "green",

    marginRight: 5,
  },

  customerListContainer: {
    height: "90%",
    backgroundColor: "white",
    marginTop: 1,
    margin: 20,
  },

  customerList: {
    borderRadius: 20,
    marginVertical: 5,
    padding: 20,
    backgroundColor: "#0381ab",
  },

  customerListText: {
    color: "white",
  },
});
