import firebase from "firebase";
require("firebase/firestore");
var config = {
  apiKey: "AIzaSyAhkRR_RloV-LojHkOrTq2C5uJWMckEntM",
  authDomain: "irelief-hophacks.firebaseapp.com",
  databaseURL: "https://irelief-hophacks.firebaseio.com",
  projectId: "irelief-hophacks",
  storageBucket: "irelief-hophacks.appspot.com",
  messagingSenderId: "86556581729"
};
firebase.initializeApp(config);
export default firebase;
