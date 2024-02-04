import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/CustomStyles";

import Icon from "react-native-vector-icons/FontAwesome6";

const Order = ({}) => {
  return (
    <SafeAreaView style={[styles.screenContainer]}>
      <Text>Order Screen</Text>
      <TouchableOpacity>
        <View>
          <Icon name="rocket" size={30} color="#900" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Order;
