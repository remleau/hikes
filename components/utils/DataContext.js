import React, { useState, createContext, useContext } from 'react';
import { useAuth } from '/components/utils/UserContext';

import { getFirestore, collection, getDocs, getDoc, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, uploadBytesResumable } from "firebase/storage";
import app from './firebase';

export const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
}

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const db = getFirestore(app);
  const storage = getStorage();
  const { getUserId } = useAuth();

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


  const addHike = async (data) => {
    const promises = [];

    Object.values(data.files).map((node, i) => {
      let storageRef = ref(storage, `images/${node.name}`);
      promises.push(uploadBytes(storageRef, node).then(uploadResult => { return getDownloadURL(uploadResult.ref) }))
    });

    const images = await Promise.all(promises);
    const refDb = doc(collection(db, "hikes"));

    data.date = new Date();
    data.files = images
    data.user_id = getUserId()

    await setDoc(refDb, data);

    return {
      text: 'Check out your hiking post',
      href: `/hikes/${refDb.id}`
    }
  }


  const deleteHike = async (id) => {
    const deletedHike = await deleteDoc(doc(db, 'hikes', id));
  }


  const getSearchResults = async (seachTerm) => {
    return seachTerm;
  } 


  // Return Values in the context for other Components
  const value = {
    data,
    setData,
    getHikes,
    getHikeById,
    addHike,
    deleteHike,
    getSearchResults
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};