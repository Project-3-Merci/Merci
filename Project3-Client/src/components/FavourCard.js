import { Link } from "react-router-dom";

function FavourCard({ title, description, location, token, taker, _id }) {
  return (
    <div className="FavourCard card">
      <Link to={`/favour/${_id}`}>
        <p>{title}</p>
      </Link>
      <p style={{ maxWidth: "200px" }}>Description: {description} </p>
      <p style={{ maxWidth: "100px" }}>Location: {location} </p>
      <p style={{ maxWidth: "100px" }}>Tokens: {token} </p>
      {
        (taker = null ? (
          <Link to={`/chat`}>
            <button>chat - no taker</button>
          </Link>
        ) : (
          <Link to={`/chat`}>
            <button>chat - has taker</button>
          </Link>
        ))
      }
    </div>
  );
}

export default FavourCard;

/* accepted que yo he aceptado
que yo posteo para que hagan: requested */
