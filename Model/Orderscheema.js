const mongoose= require('mongoose');

const Ordercheema= new mongoose.Schema({
    User:
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
            },
    shippingAddress:[
        {
            name:{
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
            }
            


        }
    ],
    paymentdetails:[
        {
            upi:
            {
                
                    type:String,
                    required:true
                
            },
            totalPrice:
            {
                type:Number,
                required:true
            },
            shippingCharge:
            {
                type:Number,
                default:20
            },
            mode:
            {
                type:String,
                required:true
            },
            paymentstatus:
            {
                type:Boolean,
                required:true
            }
            
           
        }
    ],
    orderedItems:[
        {
            items:
                {
                    type:Object,
                    required:true
                },
            date:{
                type:Date,
                default:Date.now
            }
             

        }
        
    ]
})

const Order = mongoose.model("Order",Ordercheema);

module.exports=Order;
// {
//     deliveryDate:
//     {
//     type:Date,
//     default:Date.now
//     },
//     orderStatus:
//     {
//     type:String,
//     required:true,
//     default:"ordered"
//     } ,
//     isDelivered:
//     {
//     type:Boolean,
//     required:true,
//     default:false
//     } 
   
// }
