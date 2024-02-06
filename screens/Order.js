import { SafeAreaView, TouchableOpacity, View } from "react-native";
import styles from "../styles/CustomStyles";

import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";

const Order = () => {
  return (
    <SafeAreaView style={[styles.screenContainer]}>
      <TouchableOpacity>
        <View>
          <FontAwesome6Icon name="rocket" size={30} color="#900" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Order;
