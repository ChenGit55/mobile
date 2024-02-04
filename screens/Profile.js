import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/CustomStyles";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";

const Profile = ({ navigation }) => {
  return (
    <SafeAreaView style={[styles.screenContainer]}>
      <TouchableOpacity>
        <View>
          <FontAwesome6Icon name="user" size={30} color="#900" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
