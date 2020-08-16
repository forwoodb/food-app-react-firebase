import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/analytics';

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAMTDJK-fmwhove8Zggf7589tCXl6RIHtU",
    authDomain: "foodapp-ce8b6.firebaseapp.com",
    databaseURL: "https://foodapp-ce8b6.firebaseio.com",
    projectId: "foodapp-ce8b6",
    storageBucket: "foodapp-ce8b6.appspot.com",
    messagingSenderId: "123891003199",
    appId: "1:123891003199:web:13c87f67d64c79de89ed8a",
    measurementId: "G-S7DT4Z50L6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;