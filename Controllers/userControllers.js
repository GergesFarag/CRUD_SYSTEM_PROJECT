const User = require("../models/User");
const Customer = require("../models/Customer");
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { json } = require("express");
const user_index_get = async (req, res) => {
  await res.render("index");
};

const user_login_get = async (req, res) => {
  await res.render("user/login", { danger: "" });
};

const user_reg_get = async (req, res) => {
  const danger = "";
  await res.render("user/register", { danger });
};

const user_reg_post = async (req, res) => {
  const ErrorArr = validationResult(req);
  if (ErrorArr.errors.length != 0) {
    return res.json({ missValidation: ErrorArr.errors });
  } else {
    const isCurrentEmail = await User.findOne({ email: req.body.email });
    if (isCurrentEmail) {
      return res.json({ existsEmail: "Email Already Exists!" });
    } else {
      const newUser = await User.create(req.body);
      const token = jwt.sign({ id: newUser._id }, "seckeypass");
      res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
      return res.json({ id: newUser._id });
    }
  }
};

const user_login_post = async (req, res) => {
  const user = await User.findOne({email : req.body.email})
  if(user){
    const check = await bcrypt.compare(req.body.password, user.password);
    if(check){
      const token = jwt.sign(
          { id: user._id, username: user.username },
          "seckeypass"
          );
        res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
      return res.json({success : "Data is True"})
    }else{
      return res.json({invalidPass : "Invalid Password"})
    }
  }else{
    return res.json({fail: "Invalid Email and Password"})
  }
};


const user_signout_get = async (req, res) => {
  await res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
module.exports = {
  user_index_get,
  user_login_get,
  user_reg_get,
  user_reg_post,
  user_login_post,
  user_signout_get,
};
