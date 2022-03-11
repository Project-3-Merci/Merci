import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Navigate } from "react-router-dom";


import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";


export default function UserFavoursPage() {

    

    const { isLoggedIn } = useContext(AuthContext);
    if(isLoggedIn){
        return (
            <div>
              <h1>UserFavoursPage</h1>
        
        
        
              <h2>Requested Favours</h2>
              <h3>Favours:id + status/chat</h3>
        
        
        
        
              <h2>Accepted Favours</h2>
              <h3>Favours:id + chat</h3>
              <h3>Favours:id + chat</h3>
            </div>
          )
       
     }
     else{
         return <Navigate to="/login"></Navigate>
     }
    }