import app from "./firebase";
import React, { useState, createContext, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const userInfo = auth.currentUser;
  const db = getFirestore(app);
  const [cookies, setCookie] = useCookies(["googlePhotosToken"]);
  const provider = new GoogleAuthProvider();

  // LogOut user
  const logOut = () => {
    return signOut(auth);
  };

  // Get UserInfo from profile
  const getUserData = async () => {
    const q = query(collection(db, "users"), where("uid", "==", userInfo.uid));
    const docSnap = await getDocs(q);

    const results = [];

    docSnap.forEach((doc) => {
      results.push(doc.data());
    });

    return {
      uid: userInfo.uid,
      emailVerified: userInfo.emailVerified,
      email: userInfo.email,
      photoUrl: userInfo.photoURL,
      metadata: userInfo.metadata,
      settings: results[0],
    };
  };

  // Get UserId from profile
  const getUserId = () => {
    return userInfo.uid ? userInfo.uid : null;
  };

  // Add custom fields to users
  const addUserGooglePhotosToken = async (code) => {
    const refDb = doc(db, "users", userInfo.uid);

    const data = {
      uid: getUserId(),
      googlePhotosToken: code,
    };

    setCookie("googlePhotosToken", code, { path: "/" });

    await setDoc(refDb, data, { merge: true });

    return refDb.id ? true : false;
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      console.log({ credential, token });
    });
  };

  // Handle Auth change and set User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) router.push("/connexion");

      if (user) {
        setUser(user);
      }

      if (user && router.pathname == "/connexion") {
        router.push("/");
      }
    });

    return unsubscribe;
  }, [user]);

  // Return Values in the context for other Components
  const value = {
    user,
    setUser,
    logOut,
    getUserData,
    getUserId,
    addUserGooglePhotosToken,
    signInWithGoogle,
  };

  if (!user && router.pathname !== "/connexion") {
    return null;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
