import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams, Navigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import FavourCard from "../components/FavourCard";
import apiService from "../services/api.service";

export default function UserFavoursPage(props) {
  const { isLoggedIn } = useContext(AuthContext);

  const [requestedFavours, setRequestedFavours] = useState([]);
  const [acceptedFavours, setAcceptedFavours] = useState([]);

  let { userId } = useParams();

  const getRequestedFavours = () => {
    apiService
      .getOne("favours/myList", userId)
      .then((response) => {
        setRequestedFavours(response.data.requestedFavours);
        console.log(response.data.requestedFavours)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getRequestedFavours();
  }, []);

  const getAcceptedFavours = () => {
    apiService
      .getOne("favours/myList", userId)
      .then((response) => {
        setAcceptedFavours(response.data.acceptedFavours);
        console.log(response.data.acceptedFavours)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAcceptedFavours();
  }, []);

  if (isLoggedIn) {
    return (
      <div>
        <h1>UserFavoursPage</h1>
        <div className="RequestedFavoursPage">
          <h2>Requested Favours</h2>
          {requestedFavours.length === 0  ? <p>No more requested favours</p> 
          : requestedFavours.map((requestedFavour) => (
            <FavourCard key={requestedFavour._id} {...requestedFavour} />
          ))}
        </div>

        <div className="AcceptedFavoursPage">
          <h2>Accepted Favours</h2>
          {acceptedFavours.length === 0 ? <p>No more accepted favours</p>
          : acceptedFavours.map((acceptedFavour) => (
            <FavourCard key={acceptedFavour._id} {...acceptedFavour} />
          ))}
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login"></Navigate>;
  }
}
