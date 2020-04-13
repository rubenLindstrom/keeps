import firebase from "firebase/app";
import "firebase/auth";

// Initialize Firebase
const app = firebase.initializeApp({
	apiKey: "AIzaSyCm_5eLx2kqkMvGqqBEDiUGMxaXqXcm1es",
	authDomain: "keeps-81a16.firebaseapp.com",
	databaseURL: "https://keeps-81a16.firebaseio.com",
	projectId: "keeps-81a16",
	storageBucket: "keeps-81a16.appspot.com",
	messagingSenderId: "280915404486",
	appId: "1:280915404486:web:cc76bb58e505bd7122d9c7"
});

const auth = app.auth();

export default auth;
