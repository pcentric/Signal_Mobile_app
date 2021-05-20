import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { auth } from "../firebase";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleChangeEmail = (text) => {
    return setEmail(text);
  };
  const handleChangePassword = (text) => {
    return setPassword(text);
  };

  const SignIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch((err) => alert(err));
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar barStyle="deafult" />
      <Image
        source={{
          uri:
            "https://seeklogo.com/images/S/signal-logo-20A1616F60-seeklogo.com.png",
        }}
        style={{ width: 100, height: 100 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          value={email}
          onChangeText={handleChangeEmail}
          type="email"
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          type="password"
          onChangeText={handleChangePassword}
          onSubmitEditing={SignIn}
        />
      </View>
      <Button containerStyle={styles.btn} title="Login" onPress={SignIn} />
      <Button
        onPress={() => navigation.navigate("Register")}
        containerStyle={styles.btn}
        type="outline"
        title="Register"
      />
      <View style={{ height: 40 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: { width: 300 },
  btn: { width: 200, marginTop: 10 },
});
