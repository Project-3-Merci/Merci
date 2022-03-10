import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";


function AllFavoursPage() {
  const [projects, setProjects] = useState([]);

  const getAllProjects = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(
      `${API_URL}/api/projects`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllProjects();
  }, [] );

  
  return (
    <div>
      
      <h1>All Favours Page</h1>
      
      {/*{ projects.map((project) => <ProjectCard key={project._id} {...project} />  )*/}
       
    </div>
  );
}

export default AllFavoursPage;

