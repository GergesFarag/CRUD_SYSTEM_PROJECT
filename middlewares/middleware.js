const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isUserLogin = function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "seckeypass", async (error, decoded) => {
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
    jwt.verify(token, "seckeypass", (error) => {
      //verifying token
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

module.exports = { requireAuth, isUserLogin };
