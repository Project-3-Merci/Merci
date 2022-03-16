import Map from "./map";
import React from "react";
import {GoogleMap,withGoogleMap,Marker} from "react-google-maps"
import withScriptjs from "react-google-maps/lib/withScriptjs";
import useDeepCompareEffect from 'use-deep-compare-effect'


const MapWrapped = withScriptjs(withGoogleMap(props=>Map(props)));

export default function FavourMap(props){

    return (
        <div style={{ width: "400px", height: "400px" }}>
          <MapWrapped
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAhrUxqrh8-skkxENrNW6bSRMnCBqXuJTw"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            lat= {props.lat}
            lng= {props.lng}
            zoom={props.zoom}
          />
        </div>
      );
}