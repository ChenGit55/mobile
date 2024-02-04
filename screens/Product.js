import { Button, SafeAreaView, Text } from "react-native";
import styles from "../styles/CustomStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Products = ({ navigation }) => {
  const logoutHandle = () => {
    AsyncStorage.setItem("TOKEN", "").then(
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };

  return (
    <SafeAreaView style={[styles.screenContainer]}>
      <Text>Product Screen</Text>
      <Button title="Logout" onPress={logoutHandle} />
    </SafeAreaView>
  );
};

export default Products;
