import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config.js";
import userRoute from "./routes/userRoute.js"
import relativeRoute from "./routes/relativeRoute.js"
import utilRoute from "./routes/utilRoute.js"


const app = express();
app.use(express.json());

dotenv.config();
app.use(morgan('tiny'));
app.use(cors());



mongoose.connect(config.MONGODB_URL ,  
{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true }, (err)=>{

if(err) return console.error(err);

console.log("Connected to MongoDb");
});

const PORT = process.env.PORT || 3004;

app.get("/",(req,res)=>{
    res.send("server accessible");
})

app.use('/api/user', userRoute);
app.use('/api/relative', relativeRoute);
app.use("/api/location",utilRoute );





app.listen(PORT, ()=> console.log(`Server is running up at ${PORT}`));
