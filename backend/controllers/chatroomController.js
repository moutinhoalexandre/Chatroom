const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");

exports.createChatroom = async (res, res) => {
  const { name } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";

  const chatroomExists = await Chatroom.findOne({ name });

  if (chatroomExists) throw "Chatroom with that name already exist";

  const chatroom = new Chatroom({ name });

  await chatroom.save();

  res.json({ message: "Chatroom created" });
};

exports.getAllChatrooms = async (res, res) => {
  const chatrooms = await Chatroom.findAll();

  res.json(chatrooms);
};
