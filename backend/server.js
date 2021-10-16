require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.sp2o1.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true)`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.on("error", err => {
    console.log("Mongoose connection error: " + err);
})

mongoose.connection.once("open", () => {
    console.log("MongoDB connected");
})

//Bring in the models
require("./models/users");
require("./models/chatroom");
require("./models/message");

const express = require("express");

//instantiate server
let server = express();

//parser config
server.use(express.urlencoded({ extended:true }));
server.use(express.json());

//Setup Cross Origin
server.use(require("cors")());

//Bring in the routes
server.use("/user", require("./routes/user"));
server.use("/chatroom", require("./routes/chatroom"));


//Setup error handlers
const errorHandler = require("./handlers/errorHandlers")

server.use(errorHandler.notFound)
server.use(errorHandler.mongooseErrors)
if (process.env.ENV === "development") {
    server.use(errorHandler.developmentErrors)
} else {
    server.use(errorHandler.productionErrors)
}

let http = require("http").Server(server);

let io = require("socket.io")(http);

//launch server
http.listen(8000, function () {
      console.log("Server listening on port 8000")
});


io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });
});