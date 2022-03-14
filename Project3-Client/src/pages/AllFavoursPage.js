import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import apiService from "../services/api.service";
import FavorPreview from "../components/FavourPreview";

const API_URL = "http://localhost:5005";


function AllFavoursPage() {
  const [favours, setFavours] = useState([]);
  const { user } = useContext(AuthContext)

  console.log("USER:", user)
  const getAllFavours = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    apiService
      .getAll(
        "favours"
      )
      .then((response) => setFavours(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllFavours();
  }, []);


  return (
    <div>

      <h1>All Favours Page</h1>

      {favours.map((favour) => {

           if(!favour.taker && favour.asker !== user?._id)
           return <FavorPreview key={favour._id} title={favour.title} _id={favour._id} />
          }

      

      )}

    </div>
  );
}

export default AllFavoursPage;

