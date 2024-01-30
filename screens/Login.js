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

const Login = ({ navigation }) => {
  const loginHandle = async () => {
    navigation.navigate("Main");
  };
  const signUpHandle = async () => {
    navigation.navigate("Signup");
  };
  return (
    <SafeAreaView style={{ justifyContent: "center", height: "100%" }}>
      <KeyboardAvoidingView
        style={{
          padding: 20,
          justifyContent: "space-evenly",
          //   backgroundColor: "red",
        }}
      >
        <View style={{ marginVertical: 15 }}>
          <View style={{ alignItems: "center", marginVertical: 15 }}>
            <Image
              source={require("../assets/logo.jpeg")}
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                borderWidth: 10,
                borderColor: "aqua",
              }}
            />
          </View>

          <View style={{ marginVertical: 15 }}>
            {/* <Text>Email</Text> */}
            <TextInput
              style={{ borderWidth: 1 }}
              placeholder="Your@email.com"
            ></TextInput>
          </View>
          <View style={{ marginVertical: 15 }}>
            {/* <Text>Password</Text> */}
            <TextInput
              style={{ borderWidth: 1 }}
              secureTextEntry={true}
              placeholder="Password"
            ></TextInput>
          </View>
          <View style={{ marginVertical: 15 }}>
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
