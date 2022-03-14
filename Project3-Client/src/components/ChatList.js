import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import apiService from "../services/api.service";

export default function ChatList() {

    const [chats, setChats] = useState([]);
    const { user } = useContext(AuthContext)
  
    const getAllChats = () => {
      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");
  
      // Send the token through the request "Authorization" Headers
      apiService
        .getOne("chats",user._id)
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
          console.log(chat)
  
          if (user?._id)
            return (
  
              <div className="chat-preview card">
                <h2>{chat.user1.name} AND {chat.user2.name}</h2>
              </div>
            )
        }
        )}
  
      </div>
    );
  }



