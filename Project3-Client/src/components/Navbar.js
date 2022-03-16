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
            <button className="btn btn-dark border border-warning btn-block m-1 topnav">My Favours</button>
          </Link>
          
          <Link to="/favours">
            <button className="btn btn-dark border border-warning m-1 topnav" >All Favours</button>
          </Link>

          <Link to={`/profile/${user?._id}`}>
            <button className="btn btn-dark border border-warning m-1" >Profile</button>
          </Link>

          <Link to={`/chats/${user?._id}`}>
            <button className="btn btn-dark border border-warning m-1" >Chat</button>
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
  )
  
}

export default Navbar;