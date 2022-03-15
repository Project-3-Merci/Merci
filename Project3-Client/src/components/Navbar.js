import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";




const API_URL = "http://localhost:5005";


function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser} = useContext(AuthContext);


  return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
  )
    
    {/* <nav classNameNameName=" progress-bar-striped">
      <Link to="/">
        <button classNameNameName="btn btn-dark border border-warning m-1">Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to={`/favours/myList/${user?._id}`}>
            <button classNameNameName="btn btn-dark border border-warning btn-block m-1 topnav">My Favours</button>
          </Link>
          
          <Link to="/favours">
            <button classNameNameName="btn btn-dark border border-warning m-1 topnav" >All Favours</button>
          </Link>

          <Link to={`/profile/${user?._id}`}>
            <button classNameNameName="btn btn-dark border border-warning m-1" >Profile</button>
          </Link>

          <Link to={`/chats/${user?._id}`}>
            <button classNameNameName="btn btn-dark border border-warning m-1" >Chat</button>
          </Link>
        
          <button classNameNameName="btn btn-dark border border-warning m-1" onClick={logOutUser}>Logout</button>
          <span classNameNameName="font-weight-bold" >{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link classNameNameName="text-decoration: none" to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}      
      </nav> */}
  
  
}

export default Navbar;