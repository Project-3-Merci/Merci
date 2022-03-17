import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;


function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  
  return (
    <div className="card bg-dark login-card">
      
      <div className="centered text-signup">
        <h1>Sign Up</h1>
      </div>

      <form onSubmit={handleSignupSubmit}>
        <div className="centered text-signup">
          <label>Email:</label>
        </div>
        
        <input type="email" name="email" value={email} onChange={handleEmail} />
        <div className="centered text-signup">
        <label>Password:</label>
        </div>
        <input type="password" name="password" value={password} onChange={handlePassword} />
        <div className="text-signup centered">
        <label>Name:</label>
        </div>
        <div>
        <input type="text" name="name" value={name} onChange={handleName} />
        </div>
        <button className="btn btn-outline-light border-white" type="submit">Sign Up</button>
      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }
      
      <div className="text-signup">
      <Link to={"/login"}> <p>Already have account?</p></Link>
      </div>

     
    </div>
  )
}

export default SignupPage;