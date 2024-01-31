import { SafeAreaView, Text, View } from "react-native";
import styles from "../styles/CustomStyles";

const Customers = ({ navigation }) => {
  return (
    <SafeAreaView style={[styles.screenContainer]}>
      <View>
        <Text>Customers Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default Customers;
