const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide your name!']
    },
    email:{
        type:String,
        required:[true,'Please Provide your Email!'],
        unique:true,
        lowercase:true,
        validate: [validator.isEmail,'Please provide a valid email']
    },
    photo:String,
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:8
    },
    passwordConfirm:{
        type:String,
        required:true,
        validate:{
            validator: function(el){
                return el===this.password
            },
            message:"Passwords don't Match!"
        }
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined
    next();
})

const User = mongoose.model('User',userSchema);
module.exports = User