const express = require("express");
const User = require("../models/User.model");
const Favour = require("../models/Favour.model");

const { isAuthenticated } = require("./../middleware/jwt.middleware.js");
const router = express.Router();

router.put("/:userId/accept/:id", isAuthenticated, (req, res, next) => {
  const userId = req.params.userId;
  const favourId = req.params.id;
  User.findByIdAndUpdate(userId, {$push:{acceptedFavours: favourId}}, {new:true})
  .then(()=>{
    Favour.findByIdAndUpdate(favourId,{taker:userId})
    .then((favour)=>res.status(200).json(favour))
  })
})

router.put(`/finished/:id`, isAuthenticated, (req, res, next) =>{
  const favourId = req.params.id;

  Favour.findById(favourId)
    .then((favour)=> {
      User.findByIdAndUpdate(favour.taker._id, {$inc: {token: favour.token}}, {new: true})
      .then(
        User.findByIdAndUpdate(favour.asker._id, {$inc: {token: -favour.token}}, {new: true})
        .then ((user)=>{ 
            res.status(200).json(user)
      }))
    })
})

router.post("/create/:userId", isAuthenticated, (req, res, next) => {
  const asker = req.params.userId;
  const { title, description, token, location, photo } =
    req.body;
  Favour.create({
    asker,
    title,
    description,
    token,
    location,
    photo
  })
    .then((newFavour) => {
      User.findByIdAndUpdate(asker, {
        $push: { requestedFavours: newFavour._id },
      })
        .then(() => res.json(newFavour));
    })
    .catch((error) => console.log(error));
});

router.route("/myList/:userId")
.get( isAuthenticated, (req, res, next) => {
    const  userId  = req.params.userId;
  
    User.findById(userId)
      .populate({path: "requestedFavours", model: Favour})
      .populate({path: "acceptedFavours", model: Favour})
      .then((user) => {
        res.status(200).json(user)})
      .catch((error) => res.json(error));
});

router.route("/:id")
  .get((req, res, next) => {
    Favour.findById(req.params.id)
    .populate({path: "taker", model:User})
    .populate({path: "asker", model:User})
      .then(favour => {
        res.status(200).json(favour)
      })

  })
  .delete(isAuthenticated, (req, res, next) => {
    const favourId= req.params.id

    Favour.findByIdAndRemove(favourId)
    .then((deletedFavour) => res.json(deletedFavour))
    .catch((error) => res.json (error))
})

router.get("/", (req, res, next) => {
    Favour.find().populate({path:"asker",model :User})
      .then((favours)=>res.status(200).json(favours))
});

module.exports = router;