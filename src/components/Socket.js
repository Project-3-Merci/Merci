import io from "socket.io-client"

let socket = io("http://localhost:5005")

export default socket;