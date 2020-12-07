const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
    {
    rating: Number,
    image: String,
    title: String,
    duration: String,
    ingredients: String,
    description: String, 
    fromUser : { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
    timestamps: true,
    }
);

module.exports = model("Recipe", recipeSchema);
