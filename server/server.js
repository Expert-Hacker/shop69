const express= require('express')
const app= express();
let port=process.env.PORT || 5000;
const router=require('./Router.js/router')
const bodyParser=require("body-parser");
const cookieParser = require('cookie-parser');


require('./Database/db')
//middlewares
app.use(express.json())
//for authenticating user
app.use(cookieParser())
app.use(router)

if(process.env.NODE_ENV=="production")
{
    app.use(express.static("client/build"));
}

app.listen(port,()=>{
    console.log(`Express server is Running at port ${port}`);
})