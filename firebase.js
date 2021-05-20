import * as firebase from "firebase";

import "firebase/auth";
import "firebase/database";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIdIdjyVia517LDVDj_sCc7XlDiH2KygU",
  authDomain: "signal-test-app-72b10.firebaseapp.com",
  projectId: "signal-test-app-72b10",
  storageBucket: "signal-test-app-72b10.appspot.com",
  messagingSenderId: "1079678769686",
  appId: "1:1079678769686:web:a75513941b8988b909f337",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();

const auth = firebase.auth();

export { db, auth };
