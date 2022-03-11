import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

export default function UserFavoursPage() {
  const { isLoggedIn } = useContext(AuthContext);

  const [requestedFavours, setRequestedFavours] = useState([]);
  const [acceptedFavours, setAcceptedFavours] = useState([]);

  const { userId } = useParams();

  const getRequestedFavours = () => {
    axios
      .get(`${API_URL}/myList/${userId}`)
      .then((response) => {
        const oneRequestedFavour = response.data;
        setRequestedFavours(oneRequestedFavour);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getRequestedFavours();
  }, []);


  const getAcceptedFavours = () => {
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
  }, []);

  if (isLoggedIn) {
    return (
      <div>
        <h1>UserFavoursPage</h1>

        <div className="RequestedFavoursPage">
          <h2>Requested Favours</h2>
{/* 
          {requestedFavours.map((requestedFavour)=> )} */}
          
          <h3>Favours:id + status/chat</h3>
        </div>

        <div className="AcceptedFavoursPage">
          <h2>Accepted Favours</h2>
          <h3>Favours:id + chat</h3>
          <h3>Favours:id + chat</h3>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login"></Navigate>;
  }
}
