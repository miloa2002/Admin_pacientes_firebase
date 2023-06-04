import { createContext, useEffect, useState } from "react";
import { firebaseApp } from "../firebase/firebaseConfig";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";

const auth = getAuth(firebaseApp);

const googleAuthProvider = new GoogleAuthProvider();

const userContext = createContext();

const UserProvider = ({ children }) => {

    const [globalUser, setGlobalUser] = useState(null);

    const SignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        return signInWithPopup(auth, googleAuthProvider)
    }


    useEffect(() => {
        onAuthStateChanged(auth, (userFirebase) => {
            if (userFirebase) {
                setGlobalUser(userFirebase);
            } else {
                setGlobalUser(null);
            }
        })
    }, [])


    return (
        <userContext.Provider value={{ globalUser, logIn, SignUp, auth, googleLogin }}>
            {children}
        </userContext.Provider>
    )
}

export { UserProvider }
export default userContext
