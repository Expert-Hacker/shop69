const mongoose=require('mongoose');

const cartscheema=new mongoose.Schema({
    productid:{
        type:String,
        required:true
    },
    productname:{
        type:String,
        required:true
    },
    productimage:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    totalprice:{
        type:Number,
        required:true
    },
    orderstatus:
    {
        type:String,
        required:true,
        default:"ordered"
    },
    expectedDelivery:
    {
        type:Date,
        required:true,
        default:Date.now
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
    
})

const Cart=mongoose.model("cart",cartscheema);
module.exports= Cart;