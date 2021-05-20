import React, { useLayoutEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { auth, db } from "../firebase";
import * as firebase from "firebase";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={styles.chatHeaderTitle}>
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data.photoURL ||
                "http://www.goodmorningimagesdownload.com/wp-content/uploads/2020/05/No-Whatsapp-Dp-Images-1.jpg",
            }}
          />
          <Text style={styles.Title}>{route.params.chatName}</Text>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <FontAwesome size={24} color="white" name="video-camera" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons size={24} color="white" name="call" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const sendMessages = () => {
    Keyboard.dismiss();

    db.collection("Chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("Chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView>
              {messages.map(({ id, data }) =>
                data.email === auth?.currentUser?.email ? (
                  <View key={data.id} style={styles.reciever}>
                    {console.log("hello2")}
                    <Avatar
                      position="absolute"
                      rounded
                      size={30}
                      bottom={-15}
                      right={-5}
                      source={{ uri: data.photoURL }}
                    />

                    <Text style={styles.senderText}>{data.message}</Text>
                  </View>
                ) : (
                  <View style={styles.sender}>
                    <Avatar
                      rounded
                      position="absolute"
                      rounded
                      size={30}
                      bottom={-15}
                      right={-5}
                      source={{ uri: data.photoURL }}
                    />

                    <Text style={styles.recieverText}>{data.message}</Text>
                    <Text style={styles.senderName}>
                      from&nbsp;{data.displayName}
                    </Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                placeholder="Signal Messages"
                onSubmitEditing={sendMessages}
                style={styles.TextInput}
              />
              <TouchableOpacity onPress={sendMessages} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  chatHeaderTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  Title: {
    color: "white",
    fontWeight: "700",
    marginLeft: 30,
  },
  headerRight: {
    flexDirection: "row",
    marginRight: 20,
    justifyContent: "space-between",
    width: 80,
  },
  container: {
    flex: 1,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    padding: 15,
  },
  TextInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ececec",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 40,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    alignSelf: "flex-start",
    backgroundColor: "#2b68e6",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderName: {
    fontSize: 10,
    marginTop: 23,
    textTransform: "uppercase",
  },
});
