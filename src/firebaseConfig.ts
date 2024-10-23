import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA7JIy7HSrQuHmXHPZ7AmeUn1T0_1jYrTE",
  authDomain: "ukrainianhangman.firebaseapp.com",
  projectId: "ukrainianhangman",
  databaseURL: "https://ukrainianhangman-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "ukrainianhangman.appspot.com",
  messagingSenderId: "1051069772034",
  appId: "1:1051069772034:web:f35ca136fe7caa545e121b",
  measurementId: "G-E9NPHE2KLZ",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

export default database;
