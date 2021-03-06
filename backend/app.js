const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Setup Cross Origin
app.use(require("cors")());

//Bring in the routes
app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatroom"));

//Setup error handlers
const errorHandler = require("./handlers/errorHandlers")

app.use(errorHandler.notFound)
app.use(errorHandler.mongooseErrors)
if (process.env.ENV === "development") {
    app.use(errorHandler.developmentErrors)
} else {
    app.use(errorHandler.productionErrors)
}


module.exports = app;