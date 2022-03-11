import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import apiService from "../services/api.service";

export default function ProfilePage(props) {
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);

  const [fetching, setFetching] = useState(true);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    apiService.getOne("profile", user?._id).then((response) => {
      setProfile(response.data);
      setFetching(false);
    });
  }, []);

  return !isLoading && !isLoggedIn ? (
    <Navigate to="/login" />
  ) : (
    <div>
      <h1>Profile Page</h1>
      <img src={profile.profileImg} alt="profile image" />
      <h2>{profile.name}</h2>
      <h3>{profile.email}</h3>
      <h4>Age: {profile.age}</h4>
      <h4>About me: {profile.aboutMe}</h4>

      <Link to={"/profile/:id"}>
        {" "}
        <button>Edit</button>
      </Link>
    </div>
  );
}
