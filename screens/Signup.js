import {
  Button,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "../styles/CustomStyles";

const Signup = ({ navigation }) => {
  return (
    <SafeAreaView style={[styles.screenContainer]}>
      <KeyboardAvoidingView style={[styles.forms]}>
        <View style={[styles.formFields]}>
          <View
            style={{
              alignItems: "center",
              marginVertical: 15,
            }}
          >
            <Image
              source={require("../assets/logo.jpeg")}
              style={[styles.logo]}
            />
          </View>
          <View style={[styles.formFields]}>
            {/* <Text>Email</Text> */}
            <TextInput
              style={[styles.textInput]}
              placeholder="Your name herer"
            ></TextInput>
          </View>

          <View style={[styles.formFields]}>
            {/* <Text>Email</Text> */}
            <TextInput
              style={[styles.textInput]}
              placeholder="Your@email.com"
            ></TextInput>
          </View>
          <View style={[styles.formFields]}>
            {/* <Text>Password</Text> */}
            <TextInput
              style={[styles.textInput]}
              secureTextEntry={true}
              placeholder="Password"
            ></TextInput>
          </View>
          <View style={[styles.formFields]}>
            <Button title="Save" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;
