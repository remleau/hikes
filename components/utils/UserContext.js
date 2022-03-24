import React, { useState, createContext, useContext } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
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
  const [user, setUser] = useState(null);
  const [isLoggedInState, setIsLoggedInState] = useState(false);
  const auth = getAuth(app);
  const userInfo = auth.currentUser;


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


  // Get UserId from profile
  const getUserId = () => {
    return userInfo.uid ? userInfo.uid : null;
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
    user,
    setUser,
    signUp,
    logOut,
    signIn,
    isLoggedIn,
    getUserData,
    getUserId,
  }

  if (!user && router.pathname !== '/connexion' && router.pathname !== '/register') return null;

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};