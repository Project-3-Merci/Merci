import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";

const API_URL = process.env.REACT_APP_API_URL;


function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        // console.log("JWT token", response.data.authToken);
        
        storeToken(response.data.authToken);

        authenticateUser();
        
        navigate("/");
      })
      .catch((error) => {
      	const errorDescription = error.response.data.message;
      	setErrorMessage(errorDescription);
    	})
  };
  
  return (
    <div className="card bg-dark login-card">
      <h1 className="h1-login">Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <div className="centered">
        <label>Email:</label>
        </div>
       
        <input type="email" name="email" value={email} onChange={handleEmail} />
        <div className="centered">
        <label>Password:</label>
        </div>
        <div>
        <input type="password" name="password" value={password} onChange={handlePassword} />
        </div>
        <button className="btn btn-outline-light border-white" type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Don't have an account yet?</p>
      <div className="centered login-sighup">
      <Link className="btn btn-outline-light border-white" to={"/signup"}> Sign Up</Link>
      </div>
    </div>
  )
}

export default LoginPage;