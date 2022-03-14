import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";

const API_URL = "http://localhost:5005";


function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser} = useContext(AuthContext);


  return (
    <nav className="p-3 mb-2 bg-secondary col-xs-3">
      <Link to="/">
        <button className="btn btn-dark border border-warning ">Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to={`/favours/myList/${user?._id}`}>
            <button className="btn btn-dark border border-warning btn-block col-xs-2">My Favours</button>
          </Link>
          
          <Link to="/favours">
            <button className="btn btn-dark border border-warning col-xs-2">All Favours</button>
          </Link>

          <Link to={`/profile/${user?._id}`}>
            <button className="btn btn-dark border border-warning">Profile</button>
          </Link>

          <Link to="/chat">
            <button className="btn btn-dark border border-warning">Chat</button>
          </Link>
        
          <button className="btn btn-dark border border-warning" onClick={logOutUser}>Logout</button>
          <span className="" >{user && user.name}</span>
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