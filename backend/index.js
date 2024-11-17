    import express from 'express';
    import mongoose from 'mongoose';
    import dotenv from 'dotenv';
    import cors from 'cors';
    import login from './routes/login.js'
    import dashboard from './routes/dashboard.js'
    import register from './routes/register.js'
    import logout from './routes/logout.js'


    dotenv.config();
    const app = express();


    //middleware
    app.use(cors()); 

    app.use(express.json())

    //connect to MONGODB ATLAS

    mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log("connected to mongodb sucessfully"))
    .catch((error)=> console.log('mongodb atlas connection error',error));

    //setup routes
    app.use('/api/auth',login) 
    app.use('/api/auth/',register)
    app.use('/api/auth',dashboard)
   app.use('/api/auth',logout)
    const port = process.env.PORT || 3000;
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)

    })