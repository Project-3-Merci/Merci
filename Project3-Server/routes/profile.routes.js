const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");


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
router.route("/:id/edit")

.put( (req,res)=>{

    const id = req.params.id;
    const {aboutMe, age, profileImg} = req.body
    
    UserModel.findByIdAndUpdate(id,{aboutMe, profileImg, age},{new: true})
    .then(user => res.status(200).json(user))
  })
module.exports = router;