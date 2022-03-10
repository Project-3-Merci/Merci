const express = require("express");
const User = require("../models/User.model");

const { isAuthenticated } = require('./../middleware/jwt.middleware.js');

const router = express.Router();

router.route("/:id")
.get(isAuthenticated, (req, res, next)=>{

})
.put(isAuthenticated, (req, res, next)=>{

})
module.exports = router;