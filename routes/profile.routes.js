const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");

const router = express.Router();

router
  .route("/edit/:id")

  .put((req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new:true}).then((user) => {
      res.status(200).json(user)
    });
  });
  
router.route("/:id").get(isAuthenticated, (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => console.log(error));
});


module.exports = router;
