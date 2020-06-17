import firebase from "firebase/app";
import "firebase/firestore";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCJr9Hf5lUfLenGhnUFeKiStA7S6YeWryg",
  authDomain: "list-app-ab1e5.firebaseapp.com",
  databaseURL: "https://list-app-ab1e5.firebaseio.com",
  projectId: "list-app-ab1e5",
  storageBucket: "list-app-ab1e5.appspot.com",
  messagingSenderId: "982827103253",
  appId: "1:982827103253:web:4c80d05c2c7a0f0d8a4a1c",
  measurementId: "G-KKW7MC7GFS"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
//export firestore database
export default firebaseApp.firestore();
