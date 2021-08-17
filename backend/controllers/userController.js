const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const passwordValidator = require("password-validator");
const schemaValidator = new passwordValidator();
schemaValidator
  .is()
  .min(8)
  .has()
  .uppercase(1)
  .has()
  .lowercase(1)
  .has()
  .symbols(1)
  .has()
  .not()
  .spaces();

//Create a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

  if (!emailRegex.test(email)) throw "Email is not supported from your domain";
  if (!schemaValidator.validate(password))
    throw "Password not secure enough, it must contain at least 8 characters, one number, one upper case, one lower case, one symbol and no spaces!";

  const userExists = await User.findOne({ email });

  if (userExists) throw "User with same email already exist";

  const user = new User({
    name,
    email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
  });

  await user.save();

  res.json({
    message: "User [" + name + "] registered successfully",
  });
};

//login of an existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });

  if (!user) throw "Email didn't found";
  if (!bcrypt.compareSync(password, user.password))
    throw "Email and Password did not match";
console.log(user.id)

  const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET_TOKEN);

  res.json({
    message: "User logged in successfully",
    token,
  });
};
