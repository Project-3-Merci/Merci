const express = require("express");
const User = require("../models/User.model");
const Favour = require("../models/Favour.model");

const { isAuthenticated } = require('./../middleware/jwt.middleware.js');

const router = express.Router();


router.get("/", (req, res, next)=>{

})

router.route("/:id")
.get(isAuthenticated,(req, res, next)=>{
})
.delete(isAuthenticated, (req, res, next)=>{
})


router.get("/myList/:userId",isAuthenticated, (req,res,next)=>{

})

router.post("/create",isAuthenticated, (req, res, next)=>{

})

module.exports = router;