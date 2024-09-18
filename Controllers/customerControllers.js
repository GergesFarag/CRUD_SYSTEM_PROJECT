const moment = require("moment");
const User = require("../models/User.js")

const customer_dashboard_get = async (req, res) => {
  const user = await User.findById(req.decoded);
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
  const user = await User.findById(req.decoded);
  const customer = user.customersInfo.filter(customer => (req.params.id == customer.id))
  res.render("customer/view", { customer, moment });
};

//get edit customer page 
const customer_editspecif_get = async (req, res) => {
  const user = await User.findById(req.decoded);
  const customer = user.customersInfo.filter(customer => (req.params.id == customer.id))
  res.render("customer/edit", { customer , moment });
};

//adding new customer
const customer_index_post = async (req, res) => {
  await User.updateOne({_id: req.decoded} , { $push: {customersInfo : {
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,
    phone : req.body.phone,
    age : req.body.age,
    country : req.body.country,
    gender : req.body.gender,
    createdAt: new Date(),
    }} 
  })
  res.redirect("/dashboard");
};

//delete customer
const customer_index_delete = async (req, res) => {
  await User.updateOne({_id: req.decoded} , { $pull: {customersInfo : {_id : req.params.id}} })
  res.redirect("/dashboard")
};

//edit existing customer
const customer_index_put = async (req, res) => {
  await User.updateOne(
    { "customersInfo._id" : req.params.id }, 
    { "customersInfo.$.firstname" : req.body.firstname,
      "customersInfo.$.lastname" : req.body.lastname,
      "customersInfo.$.age" : req.body.age,
      "customersInfo.$.email" : req.body.email,
      "customersInfo.$.gender" : req.body.gender,
      "customersInfo.$.country" : req.body.country,
      "customersInfo.$.updatedAt" : new Date(),
     } 
  );
  res.redirect("/dashboard");
};

//search for specific customer
const customer_search_post = async (req, res) => {
  const user = await User.findById(req.decoded)
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
