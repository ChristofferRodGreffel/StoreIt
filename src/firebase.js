// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-actG0vK3Qg26y4wE71XBo8aclyB2FSg",
  authDomain: "storeit-bdbb7.firebaseapp.com",
  projectId: "storeit-bdbb7",
  storageBucket: "storeit-bdbb7.appspot.com",
  messagingSenderId: "1081902962020",
  appId: "1:1081902962020:web:190c6f63184857ae74d671",
  databaseURL: "https://storeit-bdbb7-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

const database = getDatabase(app);
