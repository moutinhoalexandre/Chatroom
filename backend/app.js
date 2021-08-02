const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Bring in the routes
app.use(require("./routes/user"));

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