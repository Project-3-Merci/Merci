import IsPrivate from "../components/IsPrivate";
import IsAnon from "../components/IsAnon";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Map from "../components/Map"

export default function CreateFavourPage() {
    const { isLoggedIn } = useContext(AuthContext);
    if(isLoggedIn){
        return (<div>
        <h1>CREATE NEW FAVOUR PAGE</h1>
        <Map />
        </div>)
       
     }
     else{
         return <Navigate to="/login"></Navigate>
     }
}