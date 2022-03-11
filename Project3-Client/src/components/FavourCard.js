import { Link } from "react-router-dom";

function FavourCard({ title, description, photo, _id }) {
  return (
    <div className="FavourCard card">
      <Link to={`/favour/${_id}`}>
        <p>{title}</p>
      </Link>
      <p style={{ maxWidth: "200px" }}>{description} </p>
      <img src={photo} style={{ maxWidth: "400px" }} alt="favourImg" />
    </div>
  );
}

export default FavourCard;
