const moment = require("moment");
const User = require("../models/User.js")
const jwt = require("jsonwebtoken");


let getTokenId = function(req,res){
  const decoded =  jwt.verify(req.cookies.jwt , "seckeypass")
  return decoded.id
}

const customer_dashboard_get = async (req, res) => {
  const userId = getTokenId(req,res)
  const user = await User.findById(userId);
  res.render("dashboard", { customers: user.customersInfo , moment , user : res.locals.user });
};
const customer_add_get = async (req, res) => {
  await res.render("customer/add" , {moment});
};
const customer_edit_get = async (req, res) => {
  await res.render("customer/edit" , {moment});
};
const customer_search_get = async (req, res) => {
  await res.render("customer/search" ,  {moment});
};
const customer_view_get = async (req, res) => {
  const userId = getTokenId(req,res)
  const user = await User.findById(userId);
  const customer = user.customersInfo.filter(customer => (req.params.id == customer.id))
  console.log(customer)
  res.render("customer/view", { customer, moment });
};
const customer_editspecif_get = async (req, res) => {
  const userId = getTokenId(req,res)
  const user = await User.findById(userId);
  const customer = user.customersInfo.filter(customer => (req.params.id == customer.id))
  res.render("customer/edit", { customer , moment });
};
const customer_index_post = async (req, res) => {
  const userId = getTokenId(req,res)
  await User.updateOne({_id: userId} , { $push: {customersInfo : req.body} })
  res.redirect("/dashboard");
};
const customer_index_delete = async (req, res) => {
  const userId = getTokenId(req,res)
  await User.updateOne({_id: userId} , { $pull: {customersInfo : {_id : req.params.id}} })
  res.redirect("/dashboard")
};
const customer_index_put = async (req, res) => {
  await User.updateOne(
    { "customersInfo._id" : req.params.id }, 
    { "customersInfo.$" : req.body } 
  );
  res.redirect("/dashboard");
};

const customer_search_post = async (req, res) => {
  const userId = getTokenId(req,res)
  const user = await User.findById(userId)
  let customers = user.customersInfo
  const searchValue = req.body.search;
  let myCustomers = customers.filter(
    (customer) =>
      customer.firstname.toLowerCase() == String(searchValue).trim().toLowerCase() ||
      customer.lastname.toLowerCase() == String(searchValue).trim().toLowerCase()
  );
  res.render("customer/search", { myCustomers , moment});
};

module.exports = {
  customer_dashboard_get,
  customer_add_get,
  customer_edit_get,
  customer_search_get,
  customer_index_post,
  customer_view_get,
  customer_editspecif_get,
  customer_index_delete,
  customer_index_put,
  customer_search_post,
};
