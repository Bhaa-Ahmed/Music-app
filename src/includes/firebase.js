import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAFDs40vMR7zEjLOLwoLAjHAK1VjXXE0Vw",
	authDomain: "music-v2-6d794.firebaseapp.com",
	projectId: "music-v2-6d794",
	storageBucket: "music-v2-6d794.appspot.com",
	appId: "1:194723022175:web:34eb562eda961dc57d62ea",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection("users");

export { auth, db, usersCollection };