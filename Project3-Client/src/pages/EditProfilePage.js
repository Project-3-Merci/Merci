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
    apiService.updateOne("profile/edit", id, formData)
    .then(() => {
       navigate(`/profile/${id}`)
    });
  };

  return (
    <div className="EditProfilePage">
      <h3>Edit Profile</h3>

      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Image</label>
          <img src={photoUrl} alt="profile image" width={80} />
          <input
            type="file"
            onChange={(e) => setImageSelected(e.target.files[0])}
          />
        </div>
        <button type="button" onClick={uploadImage}>
          Upload Image
        </button>

        <label>Age:</label>
        <input
          type="number"
          name="age"
          min="0"
          value={formData.age}
          onChange={(e) => {
            if (e.target.value < 18) e.target.value = 18;
            handleChange(e);
          }}
        />

        <label>About me:</label>
        <textarea
          name="aboutMe"
          onChange={handleChange}
          value={formData.aboutMe}
        ></textarea>

        <button type="submit" onClick={() => (formData.profileImg = photoUrl)}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfilePage;
