require("dotenv/config");
require("./db");
const express = require("express");


const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();
require("./config")(app);



const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const favoursRouter = require("./routes/favours.routes");
app.use("/favours", favoursRouter);

const chatRouter = require("./routes/chat.routes");
app.use("/chats", isAuthenticated, chatRouter);

const profileRouter = require("./routes/profile.routes");
app.use("/profile",isAuthenticated, profileRouter);

require("./error-handling")(app);

module.exports = app;
