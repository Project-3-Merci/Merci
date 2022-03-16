import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiService from "../services/api.service";

function FavourCard({
  title,
  description,
  location,
  token,
  taker,
  asker,
  _id,
}) {
  let { userId } = useParams();

  const [sessionId, setSessionId] = useState();

  const getUserId = () => {
    apiService
      .getOne("favours/myList", userId)
      .then((response) => {
        setSessionId(response.data._id);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <div className="favour-preview card bg-secondary">
      <Link to={`/favour/${_id}`}>
        <h2>{title}</h2>
      </Link>
      <p>Description: {description} </p>
      {location ? <p>Location: {location} </p> : <p>Location not provided</p>}
      <p>Tokens: {token} </p>
      {sessionId === taker && (
        <Link to={`/chats/${sessionId}/${asker}`}>
          <button className="btn btn-dark border border-warning">Chat</button>
        </Link>
      )}
      {sessionId === asker && taker && (
        <div>
          <p>Accepted request</p>
          <Link to={`/chats/${sessionId}/${taker}`}>
            <button className="btn btn-dark border border-warning">
              Chat{" "}
            </button>
          </Link>
        </div>
      )}
      {sessionId === asker && !taker && (
        <div>
          <p>Pending</p>
          <Link to={`/favour/${_id}`}>
            <button className="btn btn-dark border border-warning">
              See details
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default FavourCard;
