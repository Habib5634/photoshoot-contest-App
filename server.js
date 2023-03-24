const express = require('express');
const cors = require('cors');
const colors = require('colors');
const dotenv = require("dotenv");
const connectDB = require('./config/db');

//env confige
dotenv.config();

//router in=mport 
const userRoutes = require('./Routes/userRoutes')
const contestRoutes = require("./Routes/contestRoutes")



//connect DB
connectDB()

//rest object
const app = express();

//middlware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes 
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/contest', contestRoutes)




//app.get('/',(req,res)=>{
//     res.status(200).send({
//         "message":"Node server"
//     });
// });*}

//ort
const PORT = process.env.PORT || 3000

//listen
app.listen(PORT, () => {
    console.log(`server is running on ${process.env.DEV_MODE} mode port no ${PORT} `.bgCyan.white);
});