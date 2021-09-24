
const express=require('express');
const router=express.Router();
let products = require('../products.js')
const ecommerceCOLL=require('../Model/Producscheema.js');
const User=require('../Model/Userscheema');
const Cart=require('../Model/Cartscheema');
const bcrypt=require('bcryptjs');
const  authorize  = require('../Authentication/auth.js');
const Order = require('../Model/Orderscheema.js');

//middlewares
router.use(express.urlencoded({
    extended: true
  }));



//Display the products
router.get('/v1/api/products',async(req,res)=>{
    let result=await ecommerceCOLL.find() 
    console.log(result)  
res.status(200).send(result)

})

router.get('/v1/api/product/:id',async(req,res)=>{
    let productID=req.params.id;
    console.log(productID)
    let result=await ecommerceCOLL.findById({_id:productID}) 
    console.log(result)  
res.status(200).send(result)

})

//create new product
router.get('/saveProduct',async(req,res)=>{
 let result=await new ecommerceCOLL({
    
     
 })
result.save()
res.status(201).send(result)
})

//add user
router.post('/register',async(req,res)=>{
        try
        {
        let {name,email,phone,address,password,cpassword}=req.body;
        console.log(req.body)
        if(!name || !email || !phone || !address || !password || !cpassword )
        {
            console.log("Fields no blank")
            return res.status(400).send("Fields no blank")
            
        }
        if(password!==cpassword)
        {
            console.log("Both password should be match")
            return res.status(400).send("Both password should be match")
            
        }
        let emailExist=await User.findOne({email})
        if(emailExist)
        {
            console.log("Email already exist");
            return res.status(400).send("Email already exist")
            
        }
        else
        {  
            const addedUser=await new User({
                name,email,phone,address,password,cpassword
            })
            addedUser.save();
            //middleware
            res.status(201).send({"Registrartion Success" : addedUser})
        }
    }
    catch(err)
    {
        console.log("Registrartion failed Try catch");
        return res.status(400).send("Registrartion failed")
        
    }
})

//signin
router.post("/login",async(req,res)=>{
    try
    {
        const{email,password}=req.body;
        if(!email || !password)
        {
            return res.status(400).send("Fields cannot be blank")
        }
        let userExist=await User.findOne({email});
        if(userExist)
        {
            let passwordMatch=await bcrypt.compare(password,userExist.password);
            if(passwordMatch)
            {
                // generating token
                let token = await userExist.generateToken();
                //storing cookies on browser
                res.cookie("shop69",token)
                if(userExist.role=="admin")
                {
                    res.status(202).send(userExist)
                }
                else
                {
                    res.status(200).send(userExist)
                }
            }
            else
            {
                res.status(400).send("Invalid credential")
            }
        }
        else
        {
            res.status(400).send("Invalid credential")
        }

    }catch(err)
    {
        res.status(400).send("Invalid credential")
    }
    

})

router.get("/v1/api/authenticateUser",authorize,(req,res)=>{
res.send(req.root_user)
})
router.get("/v1/api/addtocart",authorize,(req,res)=>{
res.send("hiii")
})

router.get("/logout",(req,res)=>{
    res.clearCookie('shop69')
    res.status(200).send("logout success")
})
router.get("/checkuser",authorize,(req,res)=>{
    console.log("checkuser")
    res.send(req.rootUser)
})

router.put("/updateuser",async(req,res)=>{
    console.log("inside update")
    const {id,name,email,phone,address}=req.body;
    // let id=req.body.id;
    console.log(id)
    let resp=await User.findByIdAndUpdate({_id:id},{
        name,email,phone,address
    },function(err,docs){
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log("updated user details", docs)
            res.status(200).send("details updated")
        }
    })
})
router.post("/addtocart",authorize,async(req,res)=>{
    const {productid,productname,productimage,qty,totalprice}=req.body;
    console.log("add to cart info");
    console.log(productname)
    let User=req.rootUser[0]._id.toString();
    let addedItem=await new Cart({
        productid: productid,
        productname: productname,
        productimage:productimage,
        qty:qty,
        totalprice:totalprice,
        User
    })
     addedItem.save();
     res.status(201).send("item added to cart")
})
router.get("/getcartItems",authorize,async(req,res)=>{
    let id=req.rootUser[0]._id.toString();
   
    let result=await Cart.find({User:id})
    if(!result)
    {
        res.status(401).send("Cart is Empty")
    }
    else if(result.length==0)
    {
        res.status(401).send("Cart is Empty")
    }
    else
    {
        res.status(200).send(result)
    }
})
router.delete('/deleteItem/:id',authorize,async(req,res)=>{
    console.log("hiii")
 let productid=req.params.id;
    let id=req.rootUser[0]._id.toString();
    let result= await Cart.deleteOne({$and:[{User:id},{productid}]});
    if(!result)
    {
        console.log("no item found")
    }
    else
    { 
        res.status(200).send(result)
        console.log(result) 
    }
})

//order router
router.post("/saveorder",authorize,async(req,res)=>{
    let id=req.rootUser[0]._id.toString();
    let result=await new Order({
        User:id,
        shippingAddress:{
            name:req.body.shippingAddress.name,
            phone:req.body.shippingAddress.phone,
            address:req.body.shippingAddress.address
        },
        paymentdetails:{
            upi:req.body.paymentdetails.upi,
            totalPrice:req.body.paymentdetails.totalPrice,
            mode:req.body.paymentdetails.mode,
            paymentstatus:req.body.paymentdetails.paymentstatus
            // 
        },
        orderedItems:{
            items:req.body.orderedItems.items

        }
    })
    result.save();
    if(result.status==201)
    { 
        
        console.log("Order saved")
    }
    else{ console.log(result)}

    //deleting cart after placING AN order
    let del=await Cart.deleteMany({User:id})
    res.status(201).send(result)
    if(res.status==201)
    {
        console.log("cart cleared")
    }
    else
    {
        console.log("cart not cleared") 
    }
})

//fetching order details
router.get("/orderDetails",authorize,(req,res)=>{
    let id=req.rootUser[0]._id.toString();
    let result= Order.find({User:id},function(err,doc){
        if(err)
        {console.log("errror while fetching order")}
        else{
            console.log(doc)
            res.status(200).send(doc)
            }
    });  
})

    /* ---------------------------------- Admin --------------------------------- */
    router.get("/allUsers",authorize,async(req,res)=>{
        let resp=await User.find();
        res.status(200).send(resp)
    })

    router.get("/getSomeOrderDetails",authorize,async(req,res)=>{
        let resp=await Order.find();
        res.status(200).send(resp)
    })

    router.get("/findbyorderId/:id",authorize,async(req,res)=>{
        let id=req.params.id
        let resp=await Order.findById({_id:id});
        res.status(200).send(resp)
    })


module.exports=router