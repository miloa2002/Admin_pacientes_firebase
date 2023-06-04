import { collection, getDocs, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../firebase/firebaseConfig";

const firestore = getFirestore(firebaseApp);

export const getPatients = async (email) => {
  const data = collection(firestore, "users", email, "pacientes");
  const res = await getDocs(data)
  return res;
};
