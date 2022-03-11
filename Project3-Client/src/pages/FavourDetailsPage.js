import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


const API_URL = "http://localhost:5005";


function FavourDetailsPage (props) {
  const [favour, setFavour] = useState(null);
  const { favourId } = useParams();
  
  
  const getFavour = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // Send the token through the request "Authorization" Headers
    axios
      .get(
        `${API_URL}/api/projects/${favourId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneFavour = response.data;
        setFavour(oneFavour);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getFavour();
  }, [] );

  
  return (
    <div className="ProjectDetails">
      {favour && (
        <>
          <h1>{favour.title}</h1>
          <p>{favour.description}</p>
        </>
      )}

      
      {/* <AddTask refreshProject={getProject} projectId={projectId} />          

      { project && project.tasks.map((task) => <TaskCard key={task._id} {...task} /> )} 

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>
          
      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link> */}
      
    </div>
  );
}

export default FavourDetailsPage;