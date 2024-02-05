import { SafeAreaView, Text, View } from "react-native";
import styles from "../styles/CustomStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const Profile = () => {
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
    </SafeAreaView>
  );
};

export default Profile;
