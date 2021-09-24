const mongoose =require('mongoose');
const dotenv =require('dotenv')

dotenv.config({path:'./config.env'})

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('DB connection success')
})

