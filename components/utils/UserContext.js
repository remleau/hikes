import React, { useState, createContext, useContext } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore"
import app from './firebase';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

export const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedInState, setIsLoggedInState] = useState(false);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const userInfo = auth.currentUser;

  const getHikes = async () => {
    const hikes = await getDocs(collection(db, "hikes"));

    const table = [];
    hikes.forEach((doc, i) => {
      table.push({
        id: doc.id,
        data: doc.data()
      });
    });

    return table; 
  }


  const getHikeById = async (id) => {
    const hike = await getDoc(doc(db, 'hikes', id));

    return hike.data() ? hike.data() : null;
  }


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
  const getUserData = () => {
    console.log({
      uid: userInfo.uid,
      emailVerified: userInfo.emailVerified,
      email: userInfo.email,
      photoUrl: userInfo.photoURL,
      metadata: userInfo.metadata
    })
    return {
      uid: userInfo.uid,
      emailVerified: userInfo.emailVerified,
      email : userInfo.email,
      photoUrl: userInfo.photoURL,
      metadata : userInfo.metadata
    };
  }


  // Handle Auth change and set User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        setIsLoggedInState(true);
        console.log(user);
      }

      if (user && (router.pathname == '/connexion' || router.pathname == '/register')) { 
        router.push('/')
      }
    });

    return unsubscribe;
  }, [user])


  // Return Values in the context for other Components
  const value = {
    data,
    setData,
    user,
    setUser,
    signUp,
    logOut,
    signIn,
    isLoggedIn,
    getUserData,
    getHikes,
    getHikeById
  }

  if (!user && router.pathname !== '/connexion' && router.pathname !== '/register') return null;

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};