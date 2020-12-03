const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
        { 
          username: {
            type: String,
            unique: true,
            required: [true, '❌ Username is required.'],
            },
          name: String,
          recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
          password: {
            type: String,
            required: [true, '❌ Password is required.']
          }
        },
        {
            timestamps: true,   
        }
);

module.exports = model("User", userSchema);