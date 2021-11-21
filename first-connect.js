import { initializeApp } from "firebase/app";
import { getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDZteUjUnHA5nNV8vGI7pgCxKA7prlNKo8",
    authDomain: "isiiube.firebaseapp.com",
    projectId: "isiiube",
    storageBucket: "isiiube.appspot.com",
    messagingSenderId: "9979137367273",
    appId: "1:979137367273:web:f6f6c4f4e7a05023f03478",
    measurementId: "G-TY0DYGCTE6"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);