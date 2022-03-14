import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import apiService from "../services/api.service";

const API_URL = "http://localhost:5005";

function FavourDetailsPage(props) {
  const [favour, setFavour] = useState(null);
  const { user } = useContext(AuthContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const getFavour = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    apiService
      .getOne("favours", id)
      .then((response) => {
        const oneFavour = response.data;
        setFavour(oneFavour);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getFavour();
  }, []);

  const deleteFavour = () => {
    apiService.deleteOne(`favours`, id).then(() => {
      navigate(`/favours/myList/${user._id}`);
    });
  };

  return (
    <div className="FavourCard card">
      <h1>Favour Detail</h1>
      {favour && (
        <>
          <h2>Title: {favour.title}</h2>
          <p>Description: {favour.description}</p>
          <p>Username: {favour.asker.name}</p>
          <p>Location: {favour.location}</p>
          <p>Tokens: {favour.token}</p>
          <img src={favour.photo} alt="favour-photo" width={80}/>
        </>
      )}
      <button className="btn-create" onClick={deleteFavour}>Delete Project</button>
    </div>
  );
}

export default FavourDetailsPage;
