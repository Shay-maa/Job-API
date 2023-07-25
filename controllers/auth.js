const User = require("../models/User");
const bcrypt = require("bcryptjs");

const { StatusCodes } = require("http-status-codes");
exports.register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({user:{name:user.name}, token});
};

exports.login = async (req, res) => {
  const  {email , password} = req.body
  if(!email || !password){
    return res.status(StatusCodes.BAD_REQUEST).send("Please Provide email and password");
  }
  const user = await User.findOne({email})
  if(!user){
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Invalid Email or Password");
  }
   const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
     return res
       .status(StatusCodes.UNAUTHORIZED)
       .send("Invalid Email or Password");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({user:{name:user.name}, token})
};
