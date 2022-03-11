import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function FavourCard({ description, photo, _id }) {
  return (
    <div className="FavourCard card">
      <Link to={`/favour/${_id}`}>
        <p style={{ maxWidth: "200px" }}>{description} </p>
      </Link>
      <img src={photo} style={{ maxWidth: "400px" }} alt="favourImg" />
    </div>
  );
}

export default FavourCard;
