import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import apiService from "../services/api.service";
import socket from "../components/Socket";

function AllFavoursPage() {
  const [favours, setFavours] = useState([]);
  const { user } = useContext(AuthContext);

  const getAllFavours = () => {
    // Get the token from the localStorage

    // Send the token through the request "Authorization" Headers
    apiService
      .getAll("favours")
      .then((response) => setFavours(response.data.reverse()))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllFavours();
  }, []);

  useEffect(() => {
    socket.on('updateFavours', () => {
      getAllFavours();
    })
}, []);

  
  return (
    <div>
      <h1 className="mt-2">All Favours</h1>

      {
        
      favours.map((favour) => {
        if (!favour.taker && favour.asker._id !== user?._id)
          return (
            <div key={favour._id} className="card bg-dark" style={{color:"white", marginBottom:"5px", padding:"6px", paddingTop:"15px", width:"375px", maxWidth:"375px"}}>
              <h2>{favour.title}</h2>
              <h5 >User: {favour.asker.name}</h5>
              <Link to={`/favour/${favour._id}`}>
                <button className="btn btn-outline-light border-white">
                  See details
                </button>
              </Link>
              {favour.asker.token >= favour.token ? (
                user?._id && (
                  <button
                    onClick={() => {
                      apiService
                        .updateOne(`favours/${user._id}/accept`, favour._id, {})
                        .then(() => {
                          apiService.createOne("chats/create", {
                            user1: user._id,
                            user2: favour.asker._id,
                          });
                          getAllFavours();
                          socket.emit('acceptedFavour', [])
                        });
                    }}
                    className="btn btn-outline-light border-success text-success"
                  >
                    Accept
                  </button>
                )
              ) : (
                <p className="text-warning">
                  Sorry, this user doesn't have tokens!
                </p>
              )}
            </div>
          );
      })}
    </div>
  );
}

export default AllFavoursPage;
