const express = require("express");
const User = require("../models/User.model");
const Favour = require("../models/Favour.model");

const { isAuthenticated } = require("./../middleware/jwt.middleware.js");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/", (req, res, next) => {
  Favour.find().then((favours) => {
    res.status(200).json(favours);
  });
});


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
  console.log("THIS IS THE LOG", req.body);
});


router.route("/:id")
  .get((req, res, next) => {
    console.log("DETAILS")
    Favour.findById(req.params.id)
      .then(favour => {
        res.status(200).json(favour)
      })

  })
  .delete(isAuthenticated, (req, res, next) => {
  })

router.post("/accept/:id", isAuthenticated, (req, res, next) => {

})


router.route("/myList/:userId")
.get( isAuthenticated, (req, res, next) => {
    const  userId  = req.params.userId;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      req.status(400).json({ message: "specified User Id is not valid" });
      return;
    } 
  
    User.findById(userId)
      .populate("requestedFavours")
      .then((user) => res.status(200).json(user))
      .catch((error) => res.json(error));
  });

module.exports = router;