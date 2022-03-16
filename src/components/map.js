import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

export default function Map(props) {

  return (
    <GoogleMap
      defaultZoom={props.zoom}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
    >
        <Marker
          key={"marker"}
          position={{ lat: props.lat, lng: props.lng }}
          onClick={() => {

          }}
        />
    </GoogleMap>
  );
}