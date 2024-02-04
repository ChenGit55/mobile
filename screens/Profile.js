import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/CustomStyles";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const Profile = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  AsyncStorage.getItem("NAME").then((name) => {
    setName(name);
  });
  AsyncStorage.getItem("EMAIL").then((email) => setEmail(email));

  return (
    <SafeAreaView style={[styles.screenContainer]}>
      <View>
        <Text>Name {name}</Text>
        <Text>Email {email}</Text>
      </View>
      {/* <FontAwesome6Icon name="user" size={30} color="#900" /> */}
    </SafeAreaView>
  );
};

export default Profile;
