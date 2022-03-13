import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

export default function CreateFavour1() {
  const API_URL = "http://localhost:5005";
  const {user} = useContext(AuthContext)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post(`${API_URL}/favours/create/${user._id}`, formData)
      .then((_) => {
        setFormData({
          title: "",
          description: "",
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
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label> Description: </label>
        <textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <h1>Token credit:</h1>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
