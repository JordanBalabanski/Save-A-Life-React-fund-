import firebase from 'firebase';
import 'firebase/storage';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAiFRtgdD2B-j-X3VKQAEFiC8Ri0PsF3Io",
    authDomain: "save-a-life-acf11.firebaseapp.com",
    databaseURL: "https://save-a-life-acf11.firebaseio.com",
    projectId: "save-a-life-acf11",
    storageBucket: "gs://save-a-life-acf11.appspot.com/",
    messagingSenderId: "595603571245"
  };
  firebase.initializeApp(config);

  const storage = firebase.storage();

  export {
      storage, firebase
  }