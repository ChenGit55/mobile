import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles/CustomStyles";

const Login = ({ navigation }) => {
  const loginHandle = async () => {
    navigation.navigate("Main");
  };
  const signUpHandle = async () => {
    navigation.navigate("Signup");
  };
  return (
    <SafeAreaView style={[styles.screenContainer]}>
      <KeyboardAvoidingView style={[styles.forms]}>
        <View style={[styles.formFields]}>
          <View style={{ alignItems: "center", marginVertical: 15 }}>
            <Image
              source={require("../assets/logo.jpeg")}
              style={[styles.logo]}
            />
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
            <Button title="Login" onPress={loginHandle} />
          </View>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={signUpHandle}
          >
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
