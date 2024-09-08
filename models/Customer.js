const mongoose = require("mongoose")
const Schema = mongoose.Schema
const customerSchema = new Schema({
    firstname : String,
    lastname : String,
    password : String,
    email : String,
    phone : Number,
    age : Number,
    country : String,
    gender : String
} ,{timestamps : true});
const Customer = mongoose.model('customer' , customerSchema)
module.exports = Customer