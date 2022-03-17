import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../services/api.service";


function EditProfilePage(props) {
  const [profile, setProfile] = useState([]);
  const [imageSelected, setImageSelected] = useState("");
  const [age, setAge] = useState();
  const navigate = useNavigate();
  const [photoUrl, setPhoto] = useState("");
  const [formData, setFormData] = useState({
    aboutMe: "",
    profileImg: "",
    age: "",
  });

  let { id } = useParams();

  useEffect(() => {
    apiService.getOne("profile", id).then((response) => {
      setProfile(response.data);
      setPhoto(response.data.profileImg);
      setFormData({
        aboutMe: response.data.aboutMe,
        profileImg: response.data.profileImg,
        age: response.data.age,
      });
    });
  }, []);

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "qgsi72uw");

    axios
      .post("https://api.cloudinary.com/v1_1/dfagcghmy/image/upload", formData)
      .then((response) => {
        setPhoto(response.data.url);
      });
  };

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setFormData((formData) => ({ ...formData, [key]: value }));
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Get the token from the localStorage
    apiService.updateOne("profile/edit", id, formData).then(() => {
      navigate(`/profile/${id}`);
    });
  };

  return (
    <div className="centered" style={{maxWidth: "375px"}}>
      <h3 className="text" style={{color: "black"}}>Edit Profile</h3>

      <form onSubmit={handleFormSubmit} className="card bg-dark edit-card" style={{marginBottom: "20px", maxWidth: "375px", width:"20rem", height: "580px", maxHeight: "580px"}}>
        <div className="centered">
        <label className="name">Image</label>
        </div>
        
        <div className="p-2">
          <img
            className="rounded img-fluid border border-warning"
            src={photoUrl}
            alt="profile image"
            width={80}
          />
          <input
            type="file"
            onChange={(e) => setImageSelected(e.target.files[0])}
          />
        </div>

        <div>
          <button
            className="btn btn-outline-light mx-auto"
            type="button"
            onClick={uploadImage}
          >
            Upload Image
          </button>
        </div>
        <div className="centered">
        <label className="text-center name">Age:</label>
        </div>
       
        <div className="mx-auto">
          <input
            className="rounded"
            type="number"
            name="age"
            min="0"
            value={formData.age}
            onChange={(e) => {
              if (e.target.value < 18) e.target.value = 18;
              handleChange(e);
            }}
          />
        </div>

<div className="centered"> 
        <label className=" name ">About me:</label>
        </div>
        <div className="p-2">
          <textarea
            className="text-dark border border-dark "
            name="aboutMe"
            onChange={handleChange}
            value={formData.aboutMe}
          ></textarea>
        </div>
        <div className="p-2">
          <button
            className="btn btn-dark btn-save btn btn-outline-light mx-auto"
            type="submit"
            onClick={() => (formData.profileImg = photoUrl)}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfilePage;