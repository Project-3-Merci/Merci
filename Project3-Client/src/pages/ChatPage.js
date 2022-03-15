import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import apiService from "../services/api.service";
import { Link } from "react-router-dom";
import socket from "../components/Socket";
export default function ChatList() {

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([])
    const [receiver, setReceiver] = useState({})
    const [chat, setChat] = useState({})

    const { id, otherId } = useParams()

    const getAllMessages = () => {

        // Send the token through the request "Authorization" Headers
        apiService
            .getAll(`chats/${id}/${otherId}`)
            .then((response) => {
                setReceiver(response.data.user1._id == id ? response.data.user2 : response.data.user1)
                setMessages(response.data.messagess)
                setChat(response.data)
            })
            .catch((error) => console.log(error));
    };

    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
        getAllMessages();
    }, []);


    useEffect(() => {
        socket.on('updateChat', users => {
            if (users.includes(id)) {
                getAllMessages()
                console.log("Chat updated")
            }
        })
    }, []);



    const addNewMessage = () => {
        apiService.createOne(`chats/newMessage/${chat._id}`, { content: newMessage, sender: id, receiver: otherId })
            .then(response => {
                socket.emit('newMessage', [response.data.sender, response.data.receiver])
            })
    }

    if (messages.length > 0)
        return (
            <div className="chat-box">

                <h2>{receiver.name}</h2>

                {messages.map((message) => {
                    const messageDate = new Date(message.createdAt)
                    const daysPassed = Math.floor((new Date().getTime() - messageDate.getTime()) / (1000 * 3600 * 24))
                    const messageFooter = daysPassed > 0
                    return (
                        <div className="my-message-div">
                            <p className="message-content">{message.content}</p>
                            <p className="message-date">{daysPassed}</p>
                        </div>
                    )
                },

                )}
                <textarea onChange={e => setNewMessage(e.target.value)}></textarea>
                <button type="button" onClick={addNewMessage}>Send</button>
            </div>
        );
    else
        return (
            <div>
                <h2>Start a conversation with {receiver.name}</h2>
                <textarea onChange={e => setNewMessage(e.target.value)}></textarea>
                <button type="button" onClick={addNewMessage}>Send</button>
            </div>
        )
}