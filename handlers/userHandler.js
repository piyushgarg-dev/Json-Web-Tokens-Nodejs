const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.signup = async(req,res,next) => {
    // const newUser = await User.create(req.body)
    const newUser = await User.create({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm
    })

    const payload = {id:newUser._id}
    const option = {expiresIn:'90d'}
    const token = jwt.sign(payload,'ultra-piyush-garg',option)




    res.status(201).json({
        status:'success',
        token,
        data:{
            user:newUser,
        }
    })
}