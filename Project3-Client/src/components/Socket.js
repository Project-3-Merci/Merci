import io from "socket.io-client"

let socket = io(process.env.REACT_APP_API_URL)

export default socket;