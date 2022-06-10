import React, { useState, createContext, useContext } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import app from './firebase';
import { useCookies } from 'react-cookie';

import { 
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  getIdToken
} from "firebase/auth";

import { getFirestore, collection, doc, setDoc, getDocs, query, where } from "firebase/firestore"

export const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoggedInState, setIsLoggedInState] = useState(false);
  const auth = getAuth(app);
  const userInfo = auth.currentUser;
  const db = getFirestore(app);
  const [cookies, setCookie] = useCookies(['googlePhotosToken']);

  // SignUp fonction
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }


  // SignIn function
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }


  // LogOut user
  const logOut = () => {
    return signOut(auth);
  }


  // Check if User isLoggedIn
  const isLoggedIn = () => isLoggedInState;


  // Get UserInfo from profile
  const getUserData = async () => {
    const q = query(collection(db, "users"), where("uid", "==", userInfo.uid));
    const docSnap = await getDocs(q);

    const results = [];

    docSnap.forEach(doc => {
      results.push(doc.data());
    });

    return {
      uid: userInfo.uid,
      emailVerified: userInfo.emailVerified,
      email : userInfo.email,
      photoUrl: userInfo.photoURL,
      metadata : userInfo.metadata,
      settings: results[0]
    };
  }


  // Get UserId from profile
  const getUserId = () => {
    return userInfo.uid ? userInfo.uid : null;
  }


  // Add custom fields to users
  const addUserGooglePhotosToken = async (code) => {
    const refDb = doc(db, "users", userInfo.uid);

    const data = {
      uid: getUserId(),
      googlePhotosToken: code
    }

    setCookie('googlePhotosToken', code, { path: '/' });

    await setDoc(refDb, data, { merge: true });

    return refDb.id ? true : false
  }


  const getGooglePhotosToken = () => {
    return "ya29.a0ARrdaM8VLbu63dvWVubfLtiSzlGSHSJCLL_exmyInx_fHacbyUqMm8RedBxWzofprrHAGvFmNt5k2wUkSOxxK_lfSl110WlOPaFoCdNRrYOqnyMyVJyEJr86jv9DR6daiU9gwntmGWcBpjJpsGufEBI53qn1"
  }


  // Handle Auth change and set User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setIsLoggedInState(true);
      }

      if (user && (router.pathname == '/connexion' || router.pathname == '/register')) { 
        router.push('/')
      }
    });

    return unsubscribe;
  }, [user])


  // Return Values in the context for other Components
  const value = {
    user,
    setUser,
    signUp,
    logOut,
    signIn,
    isLoggedIn,
    getUserData,
    getUserId,
    addUserGooglePhotosToken,
    getGooglePhotosToken
  }

  if (!user && router.pathname !== '/connexion' && router.pathname !== '/register') return null;

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};