const mongoose = require('mongoose');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Userscheema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

Userscheema.pre('save',async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password,12)
        this.cpassword=await bcrypt.hash(this.cpassword,12)
    }
    next();
})
//generating user token
Userscheema.methods.generateToken = async function(){
    let token_n= jwt.sign({_id:this._id},process.env.SECRET_KEY);
    this.tokens=this.tokens.concat({token:token_n})
    this.save();
    return token_n;
}

const User=new mongoose.model("User",Userscheema);

module.exports=User;