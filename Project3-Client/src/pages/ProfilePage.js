import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import apiService from "../services/api.service";


export default function ProfilePage(props) {
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);

  const [fetching, setFetching] = useState(true);
  const [profile, setProfile] = useState([]);

  let {id} = useParams()
  
  useEffect(() => {
    apiService.getOne("profile", id).then((response) => {
      setProfile(response.data);
      setFetching(false);
    });
  }, []);

  return !isLoading && !isLoggedIn ? (
    <Navigate to="/login" />
  ) : (
    <div className="card table-responsive">
      
      <h1 className="card-title">Profile Page</h1>
      <div className="internal-box btn btn-dark">
      <img className="rounded img-fluid"  src={profile.profileImg} alt="profile image" width={80}/>
      <h2>{profile.name}</h2>
      <h3>{profile.email}</h3>
      <h4>Age: {profile.age}</h4>
      <h4>About me: {profile.aboutMe}</h4>
      <p>tokens: {profile.token}</p>

      <Link to={`/profile/edit/${id}`}>
        {" "}
        <button className=" btn btn-outline-light border-white">Edit</button>
      </Link>
      </div>
    </div>
  );
}
