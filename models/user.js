const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "please enter a user name"],
    minlength: [5, "please provide name with min length of 5"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    validate: [isEmail, "valid email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [7, "min length for password is 7"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (userPassword) {
  const isCorrect = await bcrypt.compare(userPassword, this.password);
  return isCorrect;
};

userSchema.methods.generateToken = async function (params) {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

const USER = mongoose.model('User',userSchema);

module.exports = USER
