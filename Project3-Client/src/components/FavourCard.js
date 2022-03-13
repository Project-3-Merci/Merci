import { Link } from "react-router-dom";

function FavourCard({ title, description, location, _id }) {
  return (
    <div className="FavourCard card">
      <Link to={`/favour/${_id}`}>
        <p>{title}</p>
      </Link>
      <p style={{ maxWidth: "200px" }}>{description} </p>
      <p style={{ maxWidth: "100px" }}>{location} </p>
    </div>
  );
}

export default FavourCard;
