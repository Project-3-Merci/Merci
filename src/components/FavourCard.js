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
    <div className="FavourCard card">
      <Link to={`/favour/${_id}`}>
        <p>{title}</p>
      </Link>
      <p style={{ maxWidth: "200px" }}>Description: {description} </p>
      <p style={{ maxWidth: "100px" }}>Location: {location} </p>
      <p style={{ maxWidth: "100px" }}>Tokens: {token} </p>
      {sessionId === taker && (
        <Link to={`/chats/${sessionId}/${asker}`}>
          <button>Chat</button>
        </Link>
      )}
      {sessionId === asker && taker && (
        <div>
          <p>Accepted request</p>
          <Link to={`/chats/${sessionId}/${taker}`}>
            <button>Chat </button>
          </Link>
        </div>
      )}
      {sessionId === asker && !taker && (
        <div>
          <p>Pending</p>
          <Link to={`/favour/${_id}`}>
            <button>See details</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default FavourCard;
