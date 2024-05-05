const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
    },
    ccode: {
      type: String,
    },
    pno: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//todo: static signup method
userSchema.statics.signup = async function (
  fname,
  lname,
  ccode,
  pno,
  email,
  password
) {
  //todo: validation
  if (!fname || !lname || !ccode || !pno || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isMobilePhone(pno)) {
    throw Error("Phone no is not valid");
  }

  const existsEmail = await this.findOne({ email });

  if (existsEmail) {
    throw Error("Email address already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    fname,
    lname,
    ccode,
    pno,
    email,
    password: hash,
    isAdmin: false,
  });

  return user;
};

//todo: static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("user not found");
  }

  //todo: bcrypt package method
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect credentials");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
