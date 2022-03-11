const express = require("express");
const User = require("../models/User.model");

const { isAuthenticated } = require('./../middleware/jwt.middleware.js');

const router = express.Router();

router.route("/:id")
.get((req, res, next)=>{
    const userId = req.params.id;

    User.findById(userId)
    .then(user =>{
        res.status(200).json(user)
    })
})
.put(isAuthenticated, (req, res, next)=>{

})
module.exports = router;