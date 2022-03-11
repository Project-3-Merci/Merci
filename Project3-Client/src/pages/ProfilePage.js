import { useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";


export default function ProfilePage(props){

    const { isLoggedIn, user} = useContext(AuthContext)

    const [fetching, setFetching] = useState(true);
    const [profile, setProfile] = useState([]);

    useEffect(()=>{

      axios.get(`http://localhost:5005/profile/${user._id}`)
      .then(response =>{
        setProfile(response.data)
        setFetching(false)
      })

    }, [])

    if(!fetching) console.log(profile)

    if(isLoggedIn){
        return (
        <div>

        <h1>Profile Page</h1>
        <img src={profile.profileImg} alt="profile image"/>
        <h2>{profile.name}</h2>
        <h3>{profile.email}</h3>
        <h4>Age: {profile.age}</h4>
        <h4>About me: {profile.aboutMe}</h4>
        
        <Link to={"/profile/:id"}> <button >Edit</button></Link>

        </div>)
     }
     else{
        return <Navigate to="/login"></Navigate>
    }
}