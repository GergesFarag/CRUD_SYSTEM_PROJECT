const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema({
    username: String,
    email : String,
    password : String
});

const saltRounds = 10
userSchema.pre("save", async function (next) {
 const salt = await bcrypt.genSalt(saltRounds);
 this.password = await bcrypt.hash(this.password, salt);
 next();
});

const User = mongoose.model('user' , userSchema)
module.exports = User