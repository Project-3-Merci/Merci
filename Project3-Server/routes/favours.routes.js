const express = require("express");
const User = require("../models/User.model");
const Favour = require("../models/Favour.model");

const { isAuthenticated } = require('./../middleware/jwt.middleware.js');

const router = express.Router();


router.get("/", (req, res, next)=>{
    
    Favour.find()
    .then(favours =>{
        res.status(200).json(favours)
    })
})

router.route("/:id")
.get((req, res, next)=>{
    console.log("DETAILS")
    Favour.findById(req.params.id)
    .then(favour =>{
        res.status(200).json(favour)
    })
    
})
.delete(isAuthenticated, (req, res, next)=>{
})

router.post("/accept/:id", isAuthenticated, (req,res,next)=>{
    
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