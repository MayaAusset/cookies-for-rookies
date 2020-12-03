const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();

const Recipe = require("../models/recipemodel");
//const User = require("../models/usermodel");


//! CREATE A RECIPE
router.post("/recipe", (req, res) => {
    const { image, title, duration, ingredients, description, fromUser } = req.body;
    console.log("body", req.body);
  
    Recipe.create({
      image,
      title,
      duration,
      ingredients,
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


//! DISPLAY ALL RECIPES
router.get("/recipes", (req, res) => {
    Recipe.find()
      .populate("recipes")
      .then((allTheRecipes) => {
        res.status(200).json(allTheRecipes);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });


  //! GET ONE SPECIFIC RECIPE TO DISPLAY

  router.get("/recipes/:id", (req, res) => {
    const { id } = req.params;
  
    // Check if the incoming id is a valid ObjectId type
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    // Our projects have array of tasks' ids and
    // we can use .populate() method to get the whole task objects
    Recipe.findById(id)
      .populate("Recipe")
      .then((recipe) => {
        res.status(200).json(recipe);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });
  
// ! UPDATE A SPECIFIC RECIPE
router.put("/recipes/:id", (req, res) => {
    const { id } = req.params;
  
    // Check if the incoming id is a valid ObjectId type
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Recipe.findByIdAndUpdate(id, req.body)
      .then(() => {
        res.status(200).json({
          message: `Recipe with the id ${id} is updated successfully.`,
        });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

  //! DELETE A SPECIFIC RECIPE
router.delete("/recipes/:id", (req, res) => {
    const { id } = req.params;
  
    // Check if the incoming id is a valid ObjectId type
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Recipe.findByIdAndRemove(id)
      .then(() => {
        res.status(200).json({
          message: `Recipe with the id ${id} is removed successfully.`,
        });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

  module.exports = router;