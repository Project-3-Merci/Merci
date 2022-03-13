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

        <button className="btn-create" type="submit">
          Create Favour
        </button>
      </form>
    </div>
  );
}
