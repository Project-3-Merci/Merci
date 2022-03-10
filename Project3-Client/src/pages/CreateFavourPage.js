import IsPrivate from "../components/IsPrivate";
import IsAnon from "../components/IsAnon";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function CreateFavourPage() {
    const { isLoggedIn } = useContext(AuthContext);
    if(isLoggedIn){
        return <div>CREATE NEW FAVOUR PAGE</div>
     }
     else{
         return <Navigate to="/login"></Navigate>
     }
}