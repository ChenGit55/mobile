import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/CustomStyles";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";

const Products = ({ navigation }) => {
  return (
    <SafeAreaView style={[styles.screenContainer]}>
      <TouchableOpacity>
        <View>
          <FontAwesome6Icon name="recycle" size={30} color="#0381ab" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Products;
