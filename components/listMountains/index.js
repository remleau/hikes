import { formatDate } from "../utils/utils";
import { useRouter } from 'next/router';
import { useData } from '/components/utils/DataContext';
import React from "react";

export default function ({ hikes, setHikes,  id }) {
  const router = useRouter();
  const { deleteHike } = useData();

  console.log(hikes)

  const deleteStateHike = (id) => {
    deleteHike(id);
    setHikes(hikes.filter((hike) => hike.id !== id));
  }

  const setRows = hikes?.map((hike, i) => {
    return (
      <tr key={i} >
        <td className="name" onClick={() => router.push(`hikes/${hike.id}`)}>
          <div className="hikeName">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{hike?.data?.name}</span>
          </div>
          <div className="hikeLocation">
            <span>ZEC Louise Gosford | Secteur Gosford</span>
          </div>
        </td>
        <td className="informations">
          <div className="hikeDate">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(hike?.data?.date?.seconds)}</span>
          </div>
          <div className="hikeKilometer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>69 kM</span>
          </div>
          <div className="hikeImages">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Images: {hike?.data?.files?.length}</span>
          </div>
        </td>
        <td className="actions">
          <div className="bg-red" onClick={() => deleteStateHike(hike?.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="bg-lightGreen" onClick={() => router.push(`hikes/${hike.id}`)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        </td>
      </tr>
    )
  })

  return (
    <div className="listMountains" id={id}>
      <div className="container">
        <table className="mountains">
          <thead>
            <tr>
              <td className="name">Name</td>
              <td className="informations">Informations</td>
              <td className="actions">Actions</td>
            </tr>
          </thead>

          <tbody>
            {setRows}
          </tbody>
        </table>
      </div>
    </div>
  )
}