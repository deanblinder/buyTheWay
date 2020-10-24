import firebase from "firebase";
import 'firebase/storage'
var firebaseConfig = {
    apiKey: "AIzaSyBhjnNRBDpLdxhRwXRbiPUohAQTudP33KA",
    authDomain: "buy-the-way-a829f.firebaseapp.com",
    databaseURL: "https://buy-the-way-a829f.firebaseio.com",
    projectId: "buy-the-way-a829f",
    storageBucket: "buy-the-way-a829f.appspot.com",
    messagingSenderId: "801518734561",
    appId: "1:801518734561:web:bfb1a37104c212e31d3ba0",
    measurementId: "G-F8R84WHH2H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export {storage,firebase as default}