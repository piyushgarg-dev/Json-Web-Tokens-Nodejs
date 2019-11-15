const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signToken = id =>{
    const payload = { id: id };
    const option = { expiresIn: "90d" };

    return jwt.sign(payload, "ultra-piyush-garg", option);
}

exports.signup = async (req, res, next) => {
  // const newUser = await User.create(req.body)
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  
  const token = signToken(newUser._id)

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser
    }
  });
};

exports.login = async(req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password){
      res.status(400).json({
          status:'fail',
          message:'Missing Email or Password'
      })
  }

  const user = await User.findOne({email}).select('+password')
  

  if(!user || !(await user.correctPassword(password,user.password))){
      res.status(401).json({
          status:'unauthorized!',
          message:'Incorrect Email or Password'
      })
  }

  const token = signToken(user._id);
  res.status(200).json({
      status:'success',
      token,
      data:{
          user:{
              name:user.name,
              email:user.email
          }
      }
  })
  


};
