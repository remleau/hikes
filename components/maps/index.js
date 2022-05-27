import GoogleMapReact from 'google-map-react';
import { useState } from 'react';

export default function ({ location }) {

  return (
    <div className='map' style={{ height: '70vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.googleMapsKey }}
        center={{ lat: location?.lat, lng: location?.lng }}
        zoom={9}
        options={{
          styles: [
            {
              "featureType": "landscape.man_made",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f7f1df"
                }
              ]
            },
            {
              "featureType": "landscape.natural",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#d0e3b4"
                }
              ]
            },
            {
              "featureType": "landscape.natural.terrain",
              "elementType": "geometry",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.business",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.medical",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#fbd3da"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#bde6ab"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ffe15f"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#efd151"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "black"
                }
              ]
            },
            {
              "featureType": "transit.station.airport",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#cfb2db"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#a2daf2"
                }
              ]
            }
          ]
        }}
      >
        <MyMarker
          lat={location?.lat}
          lng={location?.lng}
          text={location?.adress}
        />
      </GoogleMapReact>
    </div>
  );
}

const MyMarker = ({ text }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(prevState => !prevState);
  };

  return (
    <div className={"pin"}>
      <div className='icon' onClick={() => handleClick()}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      </div>
      <div className={`description ${open ? 'opened' : 'closed'}`}>
        <p className="text">{text}</p>
      </div>
    </div>
  );
};