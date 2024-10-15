import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXkIMxlRbEU2DyNYrgVrwNywPSxKgmyH4",
  authDomain: "binlistio.firebaseapp.com",
  databaseURL: "https://binlistio-default-rtdb.firebaseio.com",
  projectId: "binlistio",
  storageBucket: "binlistio.appspot.com",
  messagingSenderId: "10459136687",
  appId: "1:10459136687:web:0b614249a85b0297af0a5a",
  measurementId: "G-HMH7WT44TT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
