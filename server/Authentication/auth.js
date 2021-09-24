const User = require('../Model/Userscheema');
const jwt= require('jsonwebtoken')
const cookies=require('cookie-parser')

const authorize =async (req,res,next)=>{
    try{
        console.log("indside auth.js");
        let token=req.cookies.shop69;
        console.log("token is : "+token)
        const verf_token=jwt.verify(token,process.env.SECRET_KEY);
        const root_user=await User.find({_id:verf_token._id, "tokens.token":token})
        if(!root_user)
        {
           return res.status(400).send("user not found")
        }
        req.rootUser=root_user;
        next();
        }
        catch(er)
        {
            res.status(400).send("User not authowized")
        }
  
}
module.exports=authorize;