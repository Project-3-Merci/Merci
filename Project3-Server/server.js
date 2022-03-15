const app = require("./app")
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 5005;

io.on('connection', (socket) => {
  socket.on('newMessage',(receiverId)=>{
    io.emit('updateChat', receiverId)
  })
});

server.listen(PORT, () => {
  console.log('listening on *:5005');
});