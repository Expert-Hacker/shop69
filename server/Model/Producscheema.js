const mongoose=require('mongoose');
const Productsscheema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    stock:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    rating:[
        
                {
                rate:{
                    type:Number,
                    required:true
                },
                count:{
                    type:Number,
                    required:true
                }
             }
            ]
    
})

const ecommerceCOLL=mongoose.model("ecommerceCOLL",Productsscheema);

module.exports=ecommerceCOLL;

// ,
//     price:{
//         type:Number,
//         required:true
//     },
//     description:{
//         type:String,
//         required:true
//     },
//     category:{
//         type:String,
//         required:true
//     },
//     stock:{
//         type:String,
//         required:true
//     },
//     image:{
//         type:String,
//         required:true
//     },
//     rating:[
//         {
//         rate:{
//             type:Number,
//             required:true
//         },
//         count:{
//             type:Number,
//             required:true
//         }
//     }
//     ]

rating:[
    {
    rate:{
        type:Number,
        // required:true
    },
    count:{
        type:Number,
        // required:true
    }
}
]