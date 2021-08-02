const router = require("express").Router(); //Permits the router level middleware to be loaded
const { catchErrors } = require("../handlers/errorHandlers");// We call the errorHandler
const userController =require("../controllers/userController");//We call the business logic of our roads

router.post("/login", catchErrors(userController.login));//Create a new user
router.post("/register", catchErrors(userController.register));//login of an existing user


module.exports = router;