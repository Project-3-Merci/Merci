import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams, Navigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import FavourCard from "../components/FavourCard";
import apiService from "../services/api.service";

const API_URL = "http://localhost:5005";

export default function UserFavoursPage() {
  const { isLoggedIn } = useContext(AuthContext);

  const [requestedFavours, setRequestedFavours] = useState([]);
  const [acceptedFavours, setAcceptedFavours] = useState([]);

  let { userId } = useParams();

  const getRequestedFavours = () => {
    axios
      .get(`${API_URL}/favours/myList/${userId}`)
      .then((response) => {
        const oneRequestedFavour = response.data;
        setRequestedFavours(oneRequestedFavour);
      })
      
      .catch((error) => console.log(error));
  };

  console.log(requestedFavours)
  useEffect(() => {
    getRequestedFavours();
  }, []);

/*   const getAcceptedFavours = () => {
    axios
      .get(`${API_URL}/myList/${userId}`)
      .then((response) => {
        const oneAcceptedFavour = response.data;
        setAcceptedFavours(oneAcceptedFavour);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAcceptedFavours();
  }, []); */

  if (isLoggedIn) {
    return (
      <div>
        <h1>UserFavoursPage</h1>
        <p>test userId: {userId } </p>

        <div className="RequestedFavoursPage">
          <h2>Requested Favours</h2>

          {requestedFavours.map((requestedFavour) => (
            <FavourCard key={requestedFavour._id} {...requestedFavour} />
          ))}

          <h3>Favours:id + status/chat</h3>
        </div>

{/*         <div className="AcceptedFavoursPage">
          <h2>Accepted Favours</h2>

          {acceptedFavours.map((acceptedFavour) => (
            <FavourCard key={acceptedFavour._id} {...acceptedFavour} />
          ))}

          <h3>Favours:id + chat</h3>
        </div> */}
      </div>
    );
  } else {
    return <Navigate to="/login"></Navigate>;
  }
}
