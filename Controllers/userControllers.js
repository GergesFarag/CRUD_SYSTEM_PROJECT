const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require('dotenv').config();
const cloudinary = require("cloudinary").v2
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});


const user_index_get = async (req, res) => {
  await res.render("index");
};

const user_login_get = async (req, res) => {
  await res.render("user/login", { danger: "" });
};

const user_reg_get = async (req, res) => {
  await res.render("user/register");
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
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
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

const user_update_profile_post = async (req,res) => {
     await cloudinary.uploader.upload(req.file.path , async (err , resolve) => {
    if(err){
      console.log(err)
    }else{
      const decoded =  jwt.verify(req.cookies.jwt , process.env.JWT_SECRET_KEY)
      await User.updateOne({_id : decoded.id} , {profileImage  : resolve.secure_url})
      res.redirect("/dashboard")
    }
  })
}

const user_features_get = async (req,res) => {
  await res.render("features")
}
const user_contant_get = async(req,res) => {
  await res.render("contact")
}
module.exports = {
  user_index_get,
  user_login_get,
  user_reg_get,
  user_reg_post,
  user_login_post,
  user_signout_get,
  user_update_profile_post,
  user_features_get,
  user_contant_get
};
