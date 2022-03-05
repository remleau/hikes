import React, { useState, createContext, useContext } from 'react';
import { getFirestore, collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore"
import app from './firebase';

export const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
}

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const db = getFirestore(app);


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
    const ref = doc(collection(db, "hikes"));
    const hike = await setDoc(ref, data);

    return {
      text: 'Go check out your freshly hiking post',
      href: `/hikes/${ref.id}`
    }
  }


  // Return Values in the context for other Components
  const value = {
    data,
    setData,
    getHikes,
    getHikeById,
    addHike
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};