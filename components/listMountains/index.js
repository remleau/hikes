import { formatDate } from "../utils/utils";
import Actions from "/components/actions";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function ({ hikes, setHikes, id }) {
  const [openKey, setOpenKey] = useState();
  const router = useRouter();

  const handleToggle = (key) => {
    setOpenKey(openKey !== key ? key : null);
  };

  const setRows = hikes?.map((hike, i) => {
    const userGradient = {
      background: "linear-gradient(90deg, #009977 54%, #EE1948 46%)",
      //WebkitBackgroundClip: "text", // Removed !important
      //backgroundClip: "text", // Removed !important
      color: "transparent",
    };
    return (
      <tr key={i}>
        <td className="name" onClick={() => router.push(`hikes/${hike.id}`)}>
          <div className="hikeName">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{hike?.data?.mountain_name}</span>
          </div>
          {hike?.data?.adress && (
            <div className="hikeLocation">
              <span>{hike?.data?.adress && hike?.data?.adress}</span>
            </div>
          )}
        </td>
        <td className="informations">
          <div className="hikeKilometer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
              />
            </svg>
            <span>
              {hike?.data?.kilometer ? hike?.data?.kilometer + "km" : "54/100"}
            </span>
          </div>
          <div className="hikeImages">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>21{hike?.data?.files?.length} pictures</span>
          </div>
        </td>
        <td className="actions">
          <Actions
            mountainData={hike?.data}
            id={hike.id}
            setHikes={setHikes}
            key={i}
            customKey={i}
            toggle={handleToggle}
            open={openKey === hike.id}
          />
        </td>
      </tr>
    );
  });

  return (
    <div className="listMountains" id={id}>
      <div className="container">
        <table className="mountains">
          <thead>
            <tr>
              <td className="name">Name</td>
              <td className="informations">Informations</td>
            </tr>
          </thead>

          <tbody>{setRows}</tbody>
        </table>
      </div>
    </div>
  );
}
