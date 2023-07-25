//const User = require("../models/User")
const jwt = require("jsonwebtoken")

const auth = async(req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.send("Authentication Invalid");
    }
const token = authHeader.split(" ")[1]

try{
    const payLoad = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payLoad.userId, name: payLoad.name };
    next()
}
catch(error){
    return res.send("Authentication Invalid");
}
}
module.exports = auth
