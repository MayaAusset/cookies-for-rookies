const { Router } = require("express");
const router = Router();

const Recipe = require("../models/recipemodel");
//const User = require("../models/usermodel");

router.post("/projects", (req, res) => {
    const { image, title, duration, ingredients, description, fromUser } = req.body;
    console.log("body", req.body);
  
    Recipe.create({
      image,
      title,
      duration,
      ingredients: [],
      description,
      //fromUser: req.user._id, // Add this after finishing authentication
    })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  module.exports = router;