const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");//Allows us to check that the field with the unique property is not already present in the database

//We create a data schema using mongoose with the desired properties
const messageSchema = new mongoose.schema({
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Chatroom is required",
    ref: "Chatroom",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: "User is required",
        ref : "User",
    },
    messages: {
        type: String,
        required: "Message is required",
    }
});

//and apply unique-validator to the schema
messageSchema.plugin(uniqueValidator);

// Then export this schema as a model.
module.exports = mongoose.model("Message", messageSchema);
