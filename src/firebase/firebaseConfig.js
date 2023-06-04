// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUMkmvPb8xOuyOl9MqkxYi_JAKMxbKI8U",
  authDomain: "admin-pacientes-actualizado.firebaseapp.com",
  projectId: "admin-pacientes-actualizado",
  storageBucket: "admin-pacientes-actualizado.appspot.com",
  messagingSenderId: "1084431336951",
  appId: "1:1084431336951:web:7ccb24419f77b25d331af2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export { firebaseApp };
