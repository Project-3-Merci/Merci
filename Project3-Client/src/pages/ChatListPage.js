import axios from "axios";
import { useState, useContext} from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import apiService from "../services/api.service";
import { Link } from "react-router-dom";

export default function ChatList() {

    const [chats, setChats] = useState([]);
    const {id} = useParams()
  
    const getAllChats = () => {
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");
  
      // Send the token through the request "Authorization" Headers
      apiService
        .getOne("chats",id)
        .then((response) => setChats(response.data))
        .catch((error) => console.log(error));
    };
  
    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
      getAllChats();
    }, []);
  
    return (
      <div>
  
        <h1>Chats List</h1>
  
        {chats.map((chat) => {

            const otherUser = chat.user1._id === id ? chat.user2 : chat.user1
            return (

              <Link to={`/chats/${id}/${otherUser._id}`}>
                <div className="chat-preview card">
                  <h2>{otherUser.name}</h2>
                  <img src={otherUser.profileImg} alt="profile chat" width="100px"/>
                </div>
              </Link>
            )
        }
    )}
  
      </div>
    );
  }



