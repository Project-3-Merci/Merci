import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams, Navigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import FavourCard from "../components/FavourCard";
import apiService from "../services/api.service";


export default function UserFavoursPage(props) {
  const { isLoggedIn } = useContext(AuthContext);

  const [requestedFavours, setRequestedFavours] = useState([]);


  const getRequestedFavours = () => {
    apiService
      .getOne("favours/myList", userId)
      .then((response) => {
        setRequestedFavours(response.data.requestedFavours);
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
        <div className="RequestedFavoursPage">
          <h2>Requested Favours</h2>
          {requestedFavours.map((requestedFavour) => (
            <FavourCard key={requestedFavour._id} {...requestedFavour} />
          ))}

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
