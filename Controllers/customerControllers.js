const moment = require("moment");
const Customer = require("../models/Customer"); //Getting customer Collection from models

const customer_dashboard_get = async (req, res) => {
  const customers = await Customer.find();
  res.render("dashboard.ejs", { customers, moment , user : res.locals.user });
};
const customer_add_get = async (req, res) => {
  await res.render("customer/add");
};
const customer_edit_get = async (req, res) => {
  await res.render("customer/edit");
};
const customer_search_get = async (req, res) => {
  await res.render("customer/search" );
};
const customer_view_get = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.render("customer/view", { customer, moment });
};
const customer_editspecif_get = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.render("customer/edit", { customer });
};
const customer_index_post = async (req, res) => {
  await Customer.create(req.body);
  res.redirect("/dashboard");
};
const customer_index_delete = (req, res) => {
  Customer.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("User Found And Deleted !");
      res.redirect("/dashboard");
    })
    .catch((error) => {
      console.log("Error Occured : ", error);
    });
};
const customer_index_put = async (req, res) => {
  await Customer.findByIdAndUpdate(req.params.id, req.body);
  console.log("User Updated");
  res.redirect("/dashboard");
};
const customer_search_post = async (req, res) => {
  let customers = await Customer.find();
  const searchValue = req.body.search;
  let myCustomers = customers.filter(
    (customer) =>
      customer.firstname.toLowerCase() == String(searchValue).toLowerCase() ||
      customer.lastname.toLowerCase() == String(searchValue).toLowerCase()
  );
  res.render("customer/search", { myCustomers });
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
