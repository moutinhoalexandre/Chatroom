const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) throw "Forbidden!!"; //Check if the authorization exists
    const token = req.headers.authorization.split(" ")[1]; //Extract the token from the request
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN); //The token is decrypted using the secret key
    const tokenUserId = decodedToken.userId; //Recover the userId of the decrypted token
    const userId = req.body.userId;
    console.log(decodedToken)
    console.log(userId)
    if (userId !== tokenUserId) throw "Invalid user ID"; //Returns an error if the decoded id of the request does not match the user's id
      next(); //So, the authentication is successful and the rest of the code can be executed
  } catch (err) {
    res.status(401).json({ error: new Error("Invalid request: ") });
  }
};
