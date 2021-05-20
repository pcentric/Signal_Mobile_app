import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, KeyboardAvoidingView, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerbackTitle: "Back to Login",
    });
    return () => {};
  }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: imageUrl || "https://static.toiimg.com/photo/72975551.cms",
        });
      })
      .catch((err) => {
        return alert(err.message);
      });

    // console.log(name, email, password);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text h3 style={{ marginBottom: 20 }}>
        Create a Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          value={name}
          onChangeText={(text) => setName(text)}
          autoFocus
          type="text"
          placeholder="Full Name"
        />
        <Input
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          type="email"
          autoFocus
        />
        <Input
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          secureTextEntry
          tyoe="Password"
        />
        <Input
          onChangeText={(text) => setImageUrl(text)}
          value={imageUrl}
          placeholder="Image || (Optional)"
          type="text"
          onSubmitEditing={register}
        />
      </View>
      <Button
        onPress={register}
        title="Register"
        raised
        containerStyle={styles.btn}
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    paddingTop: 40,
  },
  inputContainer: { width: 300 },
  btn: { width: 200, marginTop: 0 },
});
