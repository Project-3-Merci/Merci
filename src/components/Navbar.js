import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser} = useContext(AuthContext);


  return (
    <nav>
      <Link to="/">
        <img src="logo.png" style={{width:"50px", height:"50px"}}/>
      </Link>

      {isLoggedIn && (
        <>
          <Link to={`/favours/myList/${user?._id}`}>
            <button>My Favours</button>
          </Link>
          
          <Link to="/favours">
            <button>All Favours</button>
          </Link>

          <Link to={`/profile/${user?._id}`}>
            <button>Profile</button>
          </Link>

          <Link to={`/chats/${user?._id}`}>
            <button>Chat</button>
          </Link>
        
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}      
    </nav>
  );
}

export default Navbar;