const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const signToken = id =>{
    const payload = { id: id };
    const option = { expiresIn: "90d" };

    return jwt.sign(payload, "ultra-piyush-garg", option);
}

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(7),
  passwordConfirm: z.string().min(7),
});

exports.signup = async (req, res, next) => {
  try {
    const validatedData = userSchema.parse(req.body);
    const newUser = await User.create(validatedData);
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

  
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
