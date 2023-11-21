// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-actG0vK3Qg26y4wE71XBo8aclyB2FSg",
  authDomain: "storeit-bdbb7.firebaseapp.com",
  databaseURL: "https://storeit-bdbb7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "storeit-bdbb7",
  storageBucket: "storeit-bdbb7.appspot.com",
  messagingSenderId: "1081902962020",
  appId: "1:1081902962020:web:190c6f63184857ae74d671",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);

// Custom hook
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  });

  return currentUser;
};
