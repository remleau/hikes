import { useState } from "react";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function () {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data, error } = useSWR(() => `/api/albums`, fetcher);

  const renderedAlbums = data?.albums?.map((album, index) => {
    console.log(album);
    return (
      <div className="album" key={index}>
        <h4>{album.title}</h4>
        <div className="image-container">
          <div
            className="image"
            style={{ backgroundImage: `url(${album.coverPhotoBaseUrl})` }}
          ></div>
        </div>
      </div>
    );
  });

  if (error) {
    return null;
  }

  return (
    <div className="googlePhotosFrame">
      <div
        className="drawer-head"
        onClick={() => setOpenDrawer((prevState) => !prevState)}
      >
        <a className="btn">Choose from Google Photo</a>
      </div>
      <div className={`drawer-content ${openDrawer ? "active" : ""}`}>
        <div className="title">
          <h3>Choose From the last 5 albums</h3>
          <div
            className="close"
            onClick={() => setOpenDrawer((prevState) => !prevState)}
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="content">
          <div className="albums">{renderedAlbums}</div>
        </div>
      </div>
    </div>
  );
}
