import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import apiService from "../services/api.service";

export default function CreateFavour() {
  const API_URL = "http://localhost:5005";
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState([]);

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
    locationLat: "",
    locationLong: "",
    photo: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post(`${API_URL}/favours/create/${user._id}`, formData)
      .then((_) => {
        setFormData({
          title: "",
          description: "",
          token: "",
          location: "",
          locationLat: "",
          locationLong: "",
          photo: "",
        });
      })
      .then((_) => {
        return <Navigate to="/favours/myList"></Navigate>;
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
        setPhoto(response.data.url);
        console.log(response);
      });
  };

  return (
    <div className="AddFavour">
      <h3>Add a Favour</h3>

      <form onSubmit={handleSubmit}>
        <label className="lat-long">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label className="lat-long"> Description: </label>
        <textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label className="lat-long">Location: </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <label className="lat-long">Latitude: </label>
        <input
          type="number"
          name="locationLat"
          value={formData.locationLat}
          onChange={handleChange}
        />

        <label className="lat-long">Longitude: </label>
        <input
          type="number"
          name="locationLong"
          value={formData.locationLong}
          onChange={handleChange}
        />

        <label className="lat-long">Your token credit is:{profile.token}</label>
        <input
          type="number"
          name="token"
          value={formData.token}
          onChange={handleChange}
        />

        <input
          type="file"
          onChange={(event) => {
            setImageSelected(event.target.files[0]);
          }}
        />
        {photoUrl && <img src={photoUrl} alt="photoUrl"/>}
        <button type="button" onClick={uploadImage}>
          upload image
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
