import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import ProfilePage from "./ProfilePage";

const API_URL = "http://localhost:5005";

function EditProfilePage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [age,setAge] = useState()

  const [imageSelected, setImageSelected] = useState()
  const uploadImage = () => {
  const formData = new FormData()
    formData.append("file", imageSelected)
    formData.append("upload_present", "sp284tf1")

    axios.post("https://api.cloudinary.com/v1_1/${db0sxdfjz}/image/upload", formData)
      .then((response)=>{
        console.log(response)
      })
 }

  const navigate =  useNavigate();
  const { projectId } = useParams();
  
  
  useEffect(() => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    // Send the token through the request "Authorization" Headers 
    axios
      .get(
        `${API_URL}/api/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }    
      )
      .then((response) => {
        const oneProject = response.data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
      })
      .catch((error) => console.log(error));
    
  }, [projectId]);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description,age };
  
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');  

    // Send the token through the request "Authorization" Headers   
    axios
      .put(
        `${API_URL}/api/projects/${projectId}`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }              
      )
      .then((response) => {
        navigate(`/projects/${projectId}`)
      });
  };
  
  
  const deleteProject = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');      
    
    // Send the token through the request "Authorization" Headers   
    axios
      .delete(
        `${API_URL}/api/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }           
      )
      .then(() => navigate("/projects"))
      .catch((err) => console.log(err));
  };  

  
  return (
    <div className="EditProjectPage">
      <h3>Edit Profile</h3>

      <form onSubmit={handleFormSubmit}>
        
        <div>
        <label>Image</label>
        <input
          type="file"
          onChange={(e) => setImageSelected(e.target.files[0])
          }
        />
        <button onClick={uploadImage()}> Upload Image </button>
        </div>

         <label>Age:</label>
        <input
          type="number"
          name="age"
          min="0"
          value={age}
          onChange={(e) => {if(e.target.value > 18)
            setAge(e.target.value)
          else {
            setAge(18) 
           }
          }
        }
        />
        

        <label>About me:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>

    </div>
  );
}

export default EditProfilePage;