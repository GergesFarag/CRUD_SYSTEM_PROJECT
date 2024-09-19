const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isUserLogin = function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY , async (error, decoded) => {
      //verifying token and decode it
      if (error) {
        res.locals.user = null;
        next();
      } else {
        const userLogged = await User.findById(decoded.id);
        res.locals.user = userLogged;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const requireAuth = function (req, res, next) {;
  let token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error) => {
      if (error) {
        res.render("user/register");
      } else {
        next();
      }
    });
  } else {
    res.render("user/register");
  }
};

const getTokenId = function(req,res , next){
  const decoded =  jwt.verify(req.cookies.jwt , process.env.JWT_SECRET_KEY)
  req.decoded = decoded.id
  next()
}

module.exports = { requireAuth, isUserLogin , getTokenId };
