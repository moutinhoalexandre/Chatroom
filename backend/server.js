require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.sp2o1.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority)`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.on("error", err => {
    console.log("Mongoose connection error: " + err);
})

mongoose.connection.once("open", () => {
    console.log("MongoDB connected");
})

const app = require('./app');

app.listen(8000, () => {
    console.log("Server listening on port 8000")
});