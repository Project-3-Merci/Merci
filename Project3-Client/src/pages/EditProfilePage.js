import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import apiService from "../services/api.service";
import cloudinaryService from "../services/cloudinary";


const API_URL = "http://localhost:5005";



function EditProfilePage(props) {

const [fetching, setFetching] = useState(true);
const [profile, setProfile] = useState([]);

let {id} = useParams()

useEffect(() => {
    console.log(id)



  apiService.getOne("profile", id).then((response) => {
    setProfile(response.data);
    setFetching(false);
  });
}, []);
  const [title, setTitle] = useState("");

  const [aboutMe, setAboutMe] = useState(profile.aboutMe);
  const [age,setAge] = useState(profile.age)
  const [profileImg, setProfileImg] = useState("")
  const [imgUrl, setImgUrl] = useState("")

  const uploadImage = () => {


  const formData = new FormData()
    formData.append("file", profileImg)
    formData.append("upload_preset", "sp284tf1")

    axios.post("https://api.cloudinary.com/v1_1/db0sxdfjz/image/upload", formData)
      .then((response)=>{
        setImgUrl(response.data.url)
        console.log(response)
      })
 }

 

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { aboutMe,profileImg,age };
  
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');  

    // Send the token through the request "Authorization" Headers   
    apiService.updateOne("profile",id,requestBody)
      .then((response) => {
  
      });
  };
  
  
  
  return (
    <div className="EditProfilePage">
      <h3>Edit Profile</h3>

      <form onSubmit={handleFormSubmit}>
        
        <div>
        <label>Image</label>
        <img src={imgUrl} alt="profile image" width={80}/>
        <input
          type="file"
          onChange={e=> setProfileImg(e.target.files[0])}
        />
        </div>
        <button onClick={uploadImage}>Upload</button>

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
          
          
        />

        <button type="submit">Update Project</button>
      </form>

    </div>
  );
}

export default EditProfilePage;



