require("dotenv").config();
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.sp2o1.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true)`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

//Bring in the models
require("./models/users");
require("./models/chatroom");
require("./models/message");

const express = require("express");

//instantiate server
let server = express();

//parser config
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//Setup Cross Origin
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//Bring in the routes
server.use("/user", require("./routes/user"));
server.use("/chatroom", require("./routes/chatroom"));

//Setup error handlers
const errorHandler = require("./handlers/errorHandlers");

server.use(errorHandler.notFound);
server.use(errorHandler.mongooseErrors);
if (process.env.ENV === "development") {
  server.use(errorHandler.developmentErrors);
} else {
  server.use(errorHandler.productionErrors);
}

let http = require("http").Server(server);
let io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//launch server
http.listen(8000, function () {
  console.log("Server listening on port 8000");
});

const Message = mongoose.model("Message");
const User = mongoose.model("User");

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    socket.userId = payload.userId;
    next();
  } catch (err) {}
});

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log("A user joined chatroom: " + chatroomId);
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        message,
      });
      io.to(chatroomId).emit("newMessage", {
        message,
        name: user.name,
        userId: socket.userId,
      });
      await newMessage.save();
    }
  });
});
