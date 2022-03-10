const express = require("express");
const User = require("../models/User.model");
const Message = require("../models/Message.model");

const { isAuthenticated } = require('./../middleware/jwt.middleware.js');

const router = express.Router();

router.route("/:receiverId")
.get(isAuthenticated,(req, res, next)=>{

})

.post(isAuthenticated,(req, res, next)=>{
    
})

module.exports = router;