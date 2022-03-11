import { useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function ProfilePage(props){

    const [profile, setProfile] = useState([])

    useEffect(()=>{
        setProfile(props.profile)
    },[props.profile])

    const { isLoggedIn} = useContext(AuthContext)
    if(isLoggedIn){
        return (
        <div>

        <h1>Profile Page</h1>
        <img src={profile.profileImg} alt="Profile Image"/>
        <h2>{profile.name}</h2>
        <h3>Age: {profile.age}</h3>
        <h3>Abot me: {profile.aboutMe}</h3>
        <h4>About me:</h4>

        <Link to={"/profile/:id"}> <button >Edit</button></Link>

        </div>)
     }
     else{
        return <Navigate to="/login"></Navigate>
    }
}