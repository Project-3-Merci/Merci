import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import apiService from "../services/api.service";

function AllFavoursPage() {
  const [favours, setFavours] = useState([]);
  const { user } = useContext(AuthContext);

  const getAllFavours = () => {
    // Get the token from the localStorage

    // Send the token through the request "Authorization" Headers
    apiService
      .getAll("favours")
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
      <h1 className="mt-2">All Favours</h1>

      {favours.map((favour) => {
        if (!favour.taker && favour.asker._id !== user?._id)
          return (
            <div key={favour._id} className="favour-preview card bg-secondary">
              <h2>{favour.title}</h2>
              <h5>User: {favour.asker.name}</h5>
              <Link to={`/favour/${favour._id}`}>
                <button className="btn btn-dark border border-warning">
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
                        });
                    }}
                    className="btn btn-dark border border-success "
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
