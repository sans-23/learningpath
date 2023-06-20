const mongoose = require("mongoose")

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
    password:{
        type:String,
        required:[true, "Please enter Your password"],
        minLength:[8, "Password should be atleast 4 character long"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
})

module.exports = mongoose.model("User", userSchema)