import ChatList from "../components/ChatList"
import socket from "../components/Socket"

export default function ChatPage(){

    return(
        <div>
            <h2>Chats</h2>
            <ChatList/>
        </div>
    )
}