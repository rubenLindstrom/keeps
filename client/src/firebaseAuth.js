import firebase from "firebase/app";
import "firebase/auth";
import config from "../firebaseConfig"

// Initialize Firebase
const app = firebase.initializeApp(config);

const auth = app.auth();

export default auth;
