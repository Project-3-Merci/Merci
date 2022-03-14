require("dotenv/config");
require("./db");
const express = require("express");
const http = require("http")
const socketio = require("socket.io")

const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();
require("./config")(app);

const server = http.createServer(app)
const io =socketio(server)

io.on('connection', socket=>{
    socket.on('conectado', ()=>{
        console.log("usuario conectado")
    })
})

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const favoursRouter = require("./routes/favours.routes");
app.use("/favours", favoursRouter);

const chatRouter = require("./routes/chat.routes");
app.use("/chat", isAuthenticated, chatRouter);

const profileRouter = require("./routes/profile.routes");
app.use("/profile",isAuthenticated, profileRouter);

require("./error-handling")(app);

module.exports = app;
