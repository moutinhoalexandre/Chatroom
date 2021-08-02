const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); //Allows us to check that the field with the unique property is not already present in the database

//We create a data schema using mongoose with the desired properties
const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: "Name is required",
  },
});

//and apply unique-validator to the schema
chatroomSchema.plugin(uniqueValidator);

// Then export this schema as a model.
module.exports = mongoose.model("Chatroom", chatroomSchema);
