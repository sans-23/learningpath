const mongoose = require("mongoose")
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter Your name"],
        maxLength:[30, "Max lenght 30 character"],
        minLength:[4, "Name should be atleast 4 character long"]
    },
    email:{
        type:String,
        required:[true, "Please enter Your email"],
        unique:true,
        validate:[validator.isEmail, "Please Enter a valid Email"]
    },
    avatar:{
        type:String,
        required:[true, "Avatar is required"],
    },
})

module.exports = mongoose.model("User", userSchema)