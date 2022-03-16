import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import apiService from "../services/api.service";


function AllFavoursPage() {
  const [favours, setFavours] = useState([]);
  const { user } = useContext(AuthContext)

  const getAllFavours = () => {
    // Get the token from the localStorage

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

        if (!favour.taker && (favour.asker._id !== user?._id))
          return (

            <div key={favour._id} className="favour-preview card">
              <h2>{favour.title}</h2>
              <h4>{favour.asker.name}</h4>
              <Link to={`/favour/${favour._id}`}>
                <button>See details</button>
              </Link>
              { (favour.asker.token >= favour.token) ?
                user?._id && (<button onClick={() => {
                apiService.updateOne(`favours/${user._id}/accept`, favour._id, {})
                  .then(() => {
                    apiService.createOne("chats/create",{user1:user._id, user2:favour.asker._id})
                    getAllFavours()
                  
                  })
              }}>Accept</button>):<p> Sorry, this user run out of tokens!</p> }
            </div>
          )
      }
      )}

    </div>
  );
}

export default AllFavoursPage;

