const app = require("./app")
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
  }
});

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT;

io.on('connection', (socket) => {
  socket.on('newMessage', users=>{
    io.emit('updateChat', users)
  })
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});