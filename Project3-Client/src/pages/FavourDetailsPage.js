import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import apiService from "../services/api.service";


const API_URL = "http://localhost:5005";


function FavourDetailsPage (props) {
  const [favour, setFavour] = useState(null);
  const { id } = useParams();
  
  
  const getFavour = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // Send the token through the request "Authorization" Headers
    apiService.getOne(
        "favours", id)
      .then((response) => {
        const oneFavour = response.data;
        setFavour(oneFavour);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getFavour();
  }, [] );

  
  return (
    <div className="favour-details">
      <h1>FAVOR PAGE</h1>
      {favour && (
        <>
          <h1>{favour.title}</h1>
          <p>{favour.description}</p>
        </>
      )}

    </div>
  );
}

export default FavourDetailsPage;