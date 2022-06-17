import React, { useState, createContext, useContext } from "react";
import { useAuth } from "/components/utils/UserContext";

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
import app from "./firebase";

export const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const db = getFirestore(app);
  const storage = getStorage();
  const { getUserId } = useAuth();

  const getMountains = async () => {
    const mountains = await getDocs(collection(db, "mountains"));

    const table = [];

    mountains &&
      mountains.forEach((doc, i) => {
        table.push({
          id: doc.id,
          data: doc.data(),
        });
      });

    return table;
  };

  const getHikeById = async (id) => {
    const hike = await getDoc(doc(db, "hikes", id));

    return hike.data() ? hike.data() : null;
  };

  const getHikes = async () => {
    const hikes = await getDocs(collection(db, "hikes"));

    const table = [];
    hikes.forEach((doc, i) => {
      table.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    return table;
  };

  const addHike = async (data) => {
    const promises = [];

    console.log(data);

    // Add mountains if not found
    const qMountains = query(
      collection(db, "mountains"),
      where("mountain_id", "==", data?.location?.mountain_id || "")
    );
    const mountains = await getDocs(qMountains);
    const mountainsResults = [];
    mountains &&
      mountains.forEach((doc) => {
        mountainsResults.push(doc.data());
      });

    if (!mountainsResults?.length) {
      const refDbMountain = doc(collection(db, "mountains"));
      await setDoc(refDbMountain, {
        mountain_name: data?.location?.mountain_name,
        mountain_id: data?.location?.mountain_id,
        adress: data?.location?.adress,
        lat: data?.location?.lat,
        lng: data?.location?.lng,
      });
    }

    // Add hikes
    Object.values(data.files).map((node, i) => {
      let storageRef = ref(storage, `images/${node.name}`);
      promises.push(
        uploadBytes(storageRef, node).then((uploadResult) => {
          return getDownloadURL(uploadResult.ref);
        })
      );
    });

    const images = await Promise.all(promises);
    const refDb = doc(collection(db, "hikes"));

    data.date = new Date();
    data.files = images;
    data.user_id = getUserId();

    await setDoc(refDb, data);

    return {
      text: "Check out your hiking post",
      href: `/hikes/${refDb.id}`,
    };
  };

  const deleteHike = async (id) => {
    const deletedHike = await deleteDoc(doc(db, "hikes", id));
  };

  const getSearchResults = async (seachTerm) => {
    const q = query(
      collection(db, "hikes"),
      where("name", ">=", seachTerm),
      where("name", "<=", seachTerm + "\uf8ff")
    );
    const results = await getDocs(q);

    const searchResults = [];
    results &&
      results.forEach((doc) => {
        searchResults.push(doc.data());
      });

    return searchResults ? searchResults : null;
  };

  // Return Values in the context for other Components
  const value = {
    data,
    setData,
    getMountains,
    getHikes,
    getHikeById,
    addHike,
    deleteHike,
    getSearchResults,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
