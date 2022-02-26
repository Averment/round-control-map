import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";
import { location, UnFormattedLocationData } from "../models/models";

type MapComponentProps = {
  rawLocationArray: UnFormattedLocationData[];
  smoothLocationArray: UnFormattedLocationData[];
};

const MapComponent = ({
  rawLocationArray,
  smoothLocationArray,
}: MapComponentProps): JSX.Element => {
  const [zoomLevel, setZoomLevel] = useState<number>(6);

  let defaultCenter: google.maps.LatLngLiteral = {
    lat: 53.489758,
    lng: -2.337708,
  };

  let smoothOptions: google.maps.PolylineOptions = {
    strokeColor: "#ffff00",
    strokeOpacity: 0.75,
    strokeWeight: 2,
    icons: [
      {
        offset: "0",
        repeat: "20px",
      },
    ],
  };

  let RawOptions: google.maps.PolylineOptions = {
    strokeColor: "#ff2527",
    strokeOpacity: 0.75,
    strokeWeight: 6,
    icons: [
      {
        offset: "0",
        repeat: "20px",
      },
    ],
  };

  const formatLocations = (
    data: UnFormattedLocationData[]
  ): Array<location> => {
    const _locations = data.map((location: UnFormattedLocationData) => {
      return {
        lat: location.location_latitude,
        lng: location.location_longitude,
      };
    });
    return _locations;
  };

  const locations: location[] = formatLocations(rawLocationArray);
  const smoothedLocations: location[] = formatLocations(smoothLocationArray);

  useEffect(() => {
    if (locations.length > 0) {
      defaultCenter = locations[0];
      setZoomLevel(15);
    }
  }, [locations]);

  const mapStyles: React.CSSProperties = {
    height: "100vh",
    width: "100%",
  };

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyB0yOKmS3z3sEhx6OLY6f7E8ZPs8tWgcIs">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={zoomLevel}
          center={defaultCenter}>
          {locations && <Polyline path={locations} options={RawOptions} />}
          {smoothedLocations && (
            <Polyline path={smoothedLocations} options={smoothOptions} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
