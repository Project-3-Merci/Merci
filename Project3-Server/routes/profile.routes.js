const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary")

const router = express.Router();

router.route("/:id")
.get(isAuthenticated,(req, res, next)=>{
    const userId = req.params.id;

    User.findById(userId)
    .then(user =>{
        res.status(200).json(user)
    })
    .catch(error => console.log(error))

    
})

.put((req, res, next)=>{
    const id = req.params.userId;
    const {aboutMe,profileImg,age} = req.body;
    User.findByIdAndUpdate(id, {aboutMe,profileImg,age})
     .then(()=> res.redirect(`/profile/${id}`))
     .catch((err)=>{console.log(err)})
})
module.exports = router;