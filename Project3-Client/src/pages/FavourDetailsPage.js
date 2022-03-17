import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate, Link } from "react-router-dom";
import apiService from "../services/api.service";

function FavourDetailsPage(props) {
  const [favour, setFavour] = useState(null);
  const { user } = useContext(AuthContext);
  const [favours, setFavours] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getFavour = () => {
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

  const finishFavour = () => {
    apiService
      .updateOne(`favours/finished`, favour._id, {})
      .then(() => deleteFavour());
  };

  const getAllFavours = () => {
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
      <h1 className="mt-2">Favour Detail</h1>
      <div className="favour-preview card bg-dark" style={{color:"white", marginBottom:"5px", padding:"6px", width:"375px", maxWidth:"375px"}}>
        {favour && (
          <>
            <h2>Title: {favour.title}</h2>
            <p>Description: {favour.description}</p>
            <p>Username: {favour.asker.name}</p>
            {favour.location ? (
              <p>Location: {favour.location}</p>
            ) : (
              <p>Location not provided</p>
            )}
            <p>Tokens: {favour.token}</p>
            <div className="d-flex justify-content-center">
              {favour.photo ? (
                <img
                  src={favour.photo}
                  alt="favourPic"
                  width={80}
                  className="mb-3"
                />
              ) : (
                <p>No photo available</p>
              )}
            </div>
          </>
        )}

        {favour && user._id === favour.asker._id && (
          <button
            className="btn-create btn-dark border border-danger text-danger"
            onClick={deleteFavour}
          >
            Delete Favour
          </button>
        )}

        {favour && favour.taker && user._id === favour.taker._id && (
          <button
            className="btn-create btn-dark border border-success text-success"
            onClick={finishFavour}
          >
            Finish favour
          </button>
        )}

        {user?._id &&
          !favour?.taker &&
          user._id !== favour?.asker._id &&
          favour?.asker.token >= favour?.token && (
            <button
              onClick={() => {
                apiService
                  .updateOne(`favours/${user._id}/accept`, favour._id, {})
                  .then(() => {
                    apiService.createOne("chats/create", {
                      user1: user._id,
                      user2: favour.asker._id,
                    });
                    getFavour();
                  });
              }}
              className="btn btn-dark border border-success text-success"
            >
              Accept
            </button>
          )}

        {user?._id &&
          favour?.taker &&
          user._id !== favour?.asker._id &&
          user._id !== favour?.taker._id && (
            <Link to={`/favours`}>
              <p>This favours has been taken! Check for more here</p>
            </Link>
          )}
      </div>
    </div>
  );
}

export default FavourDetailsPage;
