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

const Signup = ({ navigation }) => {
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
          <View
            style={{
              alignItems: "center",
              marginVertical: 15,
            }}
          >
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
              placeholder="Your name herer"
            ></TextInput>
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
            <Button title="Save" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;
