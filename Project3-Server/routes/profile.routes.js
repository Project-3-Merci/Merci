const express = require("express");
const User = require("../models/User.model");

const { isAuthenticated } = require('./../middleware/jwt.middleware.js');

const router = express.Router();

router.route("/:id")
.get((req, res, next)=>{

    console.log("HOLA")
    const userId = req.params.id;

    User.findById(userId)
    .then(user =>{
        res.status(200).json(user)
    })
})
.put((req, res, next)=>{

})
module.exports = router;