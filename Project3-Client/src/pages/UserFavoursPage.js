import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams, Navigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import FavourCard from "../components/FavourCard";
import apiService from "../services/api.service";

const API_URL = "http://localhost:5005";

export default function UserFavoursPage(props) {
  const { isLoggedIn } = useContext(AuthContext);

  const [allRequestedFavours, setAllRequestedFavours] = useState([]);
  const { userId } = useParams();


  const getRequestedFavours = () => {
    apiService
      .getOne("favours/myList", userId)
      .then((response) => {
        const oneRequestedFavour = response.data;
        setAllRequestedFavours(oneRequestedFavour);
      })
   

      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getRequestedFavours();
  }, []);

  if (isLoggedIn) {
    return (
      <div>
        <h1>UserFavoursPage</h1>
        <p>test userId: {allRequestedFavours.asker} </p>

        <div className="RequestedFavoursPage">
          <h2>Requested Favours</h2>
{/* 
                    {allRequestedFavours.map((requestedFavour) => (
            <FavourCard key={requestedFavour._id} requestedFavour={requestedFavour} />
          ))}   */}

          <h3>Favours:id + status/chat</h3>
        </div>

        <div className="AcceptedFavoursPage">
          <h2>Accepted Favours</h2>

          <h3>Favours:id + chat</h3>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login"></Navigate>;
  }
}
