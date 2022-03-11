const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");

const router = express.Router();

router.route("/:id")
.get(isAuthenticated,(req, res, next)=>{
    const userId = req.params.id;

    User.findById(userId)
    .then(user =>{
        console.log(user)
        res.status(200).json(user)
    })
    .catch(error => console.log(error))

    
})
.put((req, res, next)=>{
})
module.exports = router;