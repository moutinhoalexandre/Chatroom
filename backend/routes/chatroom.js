const router = require("express").Router(); //Permits the router level middleware to be loaded
const { catchErrors } = require("../handlers/errorHandlers"); // We call the errorHandler
const chatroomController = require("../controllers/chatroomController"); //We call the business logic of our roads

const auth = require("../middleware/auth")

router.get("/", auth, catchErrors(chatroomController.getAllChatrooms)); //Get all chatrooms
router.post("/", auth, catchErrors(chatroomController.createChatroom)); //Create chatroom

module.exports = router;
