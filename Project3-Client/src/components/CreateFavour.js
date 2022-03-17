import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import apiService from "../services/api.service";
import {Card} from 'react-bootstrap'

import GoogleMap from "./googleMap";

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
    token: 0,
    location: "",
    lat: "",
    lng: "",
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
          token: 0,
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
        setPhoto(response.data.url);
      });
  };

  return (
    <div className="centered">
      <Card className="centered" border="dark" style={{ width: '30rem', maxWidth: "375px", background: "white"}}>
      <h3> </h3>
      <div className="map-border">
      <GoogleMap />
      </div>
      <form className="centered" onSubmit={handleSubmit}>
      
          <input
            id="lat"
            name="lat"
            type="number"
            className="coordinate-input hidden"
            disabled
          ></input>
          <input
            id="lng"
            name="lng"
            type="number"
            className="coordinate-input hidden"
            disabled
          ></input>

          <div className="form-group create-favour-box">
            <div className="form-floating mb-3 centered">
            <input
              type="text"
              name="title"
              className="form-control"
              style={{width: "15rem",}}
              placeholder="Enter Title"
              value={formData.title}
              onChange={handleChange}
            />
            <label htmlFor="floatingInput">Title</label>
            </div>
          </div>

          <div className="form-group create-favour-box">
            <div className="form-floating mb-3 centered">
            <textarea
              type="text"
              name="description"
              className="form-control"
              
              placeholder="Enter Description"
              rows="3" style={{height: "80px", width: "15rem"}}
              value={formData.description}
              onChange={handleChange}
            />
            <label htmlFor="floatingInput">Description</label>
            </div>
          </div>

          <div className="form-group create-favour-box">
            <div className="form-floating mb-3 centered">
          <input
            id="location"
            type="text"
            className="form-control"
            name="location"
            style={{width: "15rem"}}
            placeholder="Enter Location"
            onClick={handleChange}
          />
          <label htmlFor="floatingInput">Location</label>
            </div>
          </div>

          <div className="form-group centered">
            <div className="form-floating mb-3 centered">
          <input
            type="number"
            name="token"
            min="1"
            className="form-control centered"
            style={{width: "10rem"}}
            value={formData.token}
            onChange={(e) => {
              if (e.target.value > profile.token)
                e.target.value = profile.token;
              if (e.target.value < 0) e.target.value = 0;
              handleChange(e);
            }}
          />
          <label htmlFor="floatingInput">Your token credit is : {profile.token} </label>
          </div>
          </div>

          <div className="upload-profileImg-btn">
          <label htmlFor="favourImg" className="btn btn-outline-secondary" style={{width: "115px"}}>Choose File</label>
          <input
            id="favourImg"
            type="file"
            className="form-control-file hidden"
            onChange={(event) => {
              setImageSelected(event.target.files[0]);
            }}
          />
          <div style={{width: "50%"}}>
          {photoUrl && <img src={photoUrl} alt="photoUrl" className="img-thumbnail"/>}
          </div>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={uploadImage}
          >
            Upload Image
          </button>
          </div>

          <button
            className="btn-create btn btn-outline-dark"
            type="submit"
            style={{marginTop: "30px", marginBottom: "10px"}}
            onClick={() => {
              formData.photo = photoUrl;
            }}
          >
            Create Favour
          </button>

      </form>
      </Card>
    </div>
  );
}
