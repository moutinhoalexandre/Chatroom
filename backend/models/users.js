const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); //Allows us to check that the field with the unique property is not already present in the database

//We create a data schema using mongoose with the desired properties
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: "Name is required",
    },
    email: {
      type: String,
      unique: true,
      required: "Email is required",
    },
    password: {
      type: String,
      required: "Password is required",
    },
  },
  {
    timestamps: true,
  }
);

//and apply unique-validator to the schema
userSchema.plugin(uniqueValidator);

// Then export this schema as a model.
module.exports = mongoose.Schema("Users", userSchema);
