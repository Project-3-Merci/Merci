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

router.post("/create/:userId", (req, res, next)=>{
    const asker = req.params.userId
    const {title, description } = req.body
    Favour.create({
        asker, title, description
    })
    .then((newFavour) => res.json(newFavour))
    .catch((error) => console.log(error))
    console.log("THIS IS THE LOG",req.body)
})

module.exports = router;