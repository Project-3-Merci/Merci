const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");

const router = express.Router();

router.route("/:id").get(isAuthenticated, (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => console.log(error));
});

router
  .route("/edit/:id")

  .put((req, res) => {
    console.log("ID:", req.params.id);
    console.log(req.body);

    User.findByIdAndUpdate(req.params.id, req.body, {new:true}).then(console.log);
  });

module.exports = router;
