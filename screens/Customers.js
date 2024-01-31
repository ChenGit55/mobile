import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles/CustomStyles";
import axios from "axios";
import { useEffect, useState } from "react";

const Customers = ({ navigation }) => {
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    const getCustomersData = async () => {
      try {
        const response = await axios.get("http://192.168.1.3:3000/client/list");
        setCustomers(response.data);
      } catch (error) {
        console.error("Erro ao obter dados do servidor:", error);
      }
    };

    getCustomersData();
  }, []);

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
            // <View
            //   style={{
            //     borderWidth: 1,
            //     borderRadius: 20,
            //     marginHorizontal: 20,
            //     marginVertical: 5,
            //     padding: 20,
            //   }}
            // >
            //   <Text>{item.name}</Text>
            //   <Text>{item.email}</Text>
            //   <Text>{item.cpf}</Text>
            // </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Customers;
