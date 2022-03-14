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

    </div>
  );
}

export default FavourCard;

