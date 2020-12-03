const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
    {
    image: String,
    title: String,
    duration: String,
    ingredients: [{ type: String }],
    description: String, 
    fromUser : [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    {
    timestamps: true,
    }
);

modulet.exports = model("Recipe", recipeSchema);
