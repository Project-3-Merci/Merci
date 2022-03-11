import { useContext} from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function ProfilePage(props){

    const { isLoggedIn, user} = useContext(AuthContext)
    if(isLoggedIn){
        return (
        <div>

        <h1>Profile Page</h1>
        <img src=""/>
        <h2>{user.name}</h2>
        <h3>{user.email}</h3>
        <h4>Age:</h4>
        <h4>About me:</h4>
        
        <Link to={"/profile/:id"}> <button >Edit</button></Link>

        </div>)
     }
     else{
        return <Navigate to="/login"></Navigate>
    }
}