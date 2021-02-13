 import firebase from "firebase"
require("@firebase/firestore") 
 
 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCSEaML6uSafd3BE9nKvR9XWFV5RREpssQ",
    authDomain: "booksantaapp-92930.firebaseapp.com",
    projectId: "booksantaapp-92930",
    storageBucket: "booksantaapp-92930.appspot.com",
    messagingSenderId: "411277235425",
    appId: "1:411277235425:web:048eafd989fb28b085d3a0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();