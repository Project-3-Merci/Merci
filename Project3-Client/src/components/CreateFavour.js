import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import apiService from "../services/api.service";

export default function CreateFavour() {

  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiService.getOne("profile", user._id).then((response) => {
      setProfile(response.data);
    });
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    token: "",
    location: "",
    photo: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    apiService
      .createOne(`favours/create/${user._id}`, formData)
      .then((_) => {
        setFormData({
          title: "",
          description: "",
          token: "",
          location: "",
          photo: "",
        });
      })
      .then((_) => {
        navigate(`/favours/myList/${user._id}`);
      });
  }

  function handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    setFormData((formData) => ({ ...formData, [key]: value }));
  }

  const [imageSelected, setImageSelected] = useState("");
  const [photoUrl, setPhoto] = useState("");

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "qgsi72uw");

    axios
      .post("https://api.cloudinary.com/v1_1/dfagcghmy/image/upload", formData)
      .then((response) => {
        console.log(response);
        setPhoto(response.data.url);
      });
  };

  return (
    <div className="AddFavour">
      <h3>Add a Favour</h3>

      <form onSubmit={handleSubmit}>
        <label className="btn-create">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label className="btn-create"> Description: </label>
        <textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label className="btn-create">Location: </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <label className="btn-create">
          Your token credit is: {profile.token}
        </label>
        <input
          type="number"
          name="token"
          value={formData.token}
          onChange={handleChange}
        />

        <input
          type="file"
          className="img-upload"
          onChange={(event) => {
            setImageSelected(event.target.files[0]);
          }}
        />

        {photoUrl && <img src={photoUrl} alt="photoUrl" width="10%" />}

        <button className="btn-upload-img" type="button" onClick={uploadImage}>
          Upload Image
        </button>

        <button
          className="btn-create"
          type="submit"
          onClick={() => (formData.photo = photoUrl)}
        >
          Create Favour
        </button>
      </form>
    </div>
  );
}
