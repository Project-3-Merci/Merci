import axios from "axios";
import { useState, useContext} from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import apiService from "../services/api.service";
import { Link } from "react-router-dom";

export default function ChatList() {

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([])
    const [receiver, setReceiver] = useState({})

    const {id, otherId} = useParams()
  
    const getAllMessages = () => {

      // Send the token through the request "Authorization" Headers
      apiService
        .getAll(`chats/${id}/${otherId}`)
        .then((response) => {
            setReceiver(response.data.users[0]._id == id ? response.data.users[1]: response.data.users[0]) 
            setMessages(response.data.messages)
        })
        .catch((error) => console.log(error));
    };
  
    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
      getAllMessages();
    }, []);

    const addNewMessage= () => {

    }
    if(messages.length > 0)
    return (
      <div className="chat-box">
          
        <h2>{receiver.name}</h2>

        {messages.map((message) => {

            return (
                <p>{message.content}</p>
            )
        },

        <textarea>{newMessage}</textarea>
    )}
  
      </div>
    );
    else
    return(
        <div>
            <h2>Start a conversation with {receiver.name}</h2>
            <textarea onChange={e=>setNewMessage(e.target.value)}>{newMessage}</textarea>
            <button type="button" onClick={e => setMessages()}>Send</button>
        </div>
        
    )
  }