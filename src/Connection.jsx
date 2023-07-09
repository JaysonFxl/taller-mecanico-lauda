import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgQeIS0lG4eWjGGsZoHlG3K4B44W5ttEg",
  authDomain: "mk-2-4e291.firebaseapp.com",
  projectId: "mk-2-4e291",
  storageBucket: "mk-2-4e291.appspot.com",
  messagingSenderId: "1048090082502",
  appId: "1:1048090082502:web:0b6e717fb65f625230abc7",
  measurementId: "G-1RXKHZF0QT"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore, collection, addDoc };