import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles/CustomStyles";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const Customers = ({ navigation }) => {
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    const getCustomersData = async () => {
      try {
        const response = await axios.get("http://192.168.1.3:3000/client/list");
        setCustomers(response.data.sort((a, b) => a.id - b.id));
      } catch (error) {
        console.error("Erro ao obter dados do servidor:", error);
      }
    };

    getCustomersData();
  });

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

export default Customers;
