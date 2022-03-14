import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";

const API_URL = "http://localhost:5005";


function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser} = useContext(AuthContext);


  return (





    
    <nav className=" progress-bar-striped">
      <Link to="/">
        <button className="btn btn-dark border border-warning m-1">Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to={`/favours/myList/${user?._id}`}>
            <button className="btn btn-dark border border-warning btn-block m-1">My Favours</button>
          </Link>
          
          <Link to="/favours">
            <button className="btn btn-dark border border-warning m-1">All Favours</button>
          </Link>

          <Link to={`/profile/${user?._id}`}>
            <button className="btn btn-dark border border-warning m-1">Profile</button>
          </Link>

          <Link to="/chats">
            <button>Chat</button>
          </Link>
        
          <button className="btn btn-dark border border-warning m-1" onClick={logOutUser}>Logout</button>
          <span className="font-weight-bold" >{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link className="text-decoration: none" to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}      
    </nav>
  );
}

export default Navbar;