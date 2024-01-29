import express from 'express';
import {db} from './db.js';

db();

const app=express();
app.use(express.json());

//Import routes
import RegisterRoutes from './routes/register.route.js';

app.use('/api/register',RegisterRoutes);

app.get("/",(req,res)=>{
    res,send("Hello Working fine");
})

app.listen(process.env.PORT | 3000,()=>{
    console.log("Server Running");
})
