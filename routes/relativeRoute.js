import express from 'express';
import { isAuth } from '../util.js';
import Relative from '../model/relativeModel.js';

const router = express.Router();

router.get("/all", isAuth, async (req, res) => {
console.log("got all relatives",req.user._id);
  try{
    
    const allRelatives = await Relative.find({userId : req.user._id});

      return res.send({
        success:true,
        allRelatives: allRelatives
      });
}catch(err){
      res.status(409).json({ message: `${err.message} Invalid Relative Data.` });
    }
  })
  
router.post("/", isAuth, async(req, res)=>{
  
  try{
    const postedRelative = req.body;
    postedRelative.userId = req.user._id;

    console.log({postedRelative});

    const relative = new Relative({
        ...postedRelative
      });
      const newRelative = await relative.save();

    console.log({postedRelative},{newRelative});
    if(newRelative){
      res.status(200).send({
        success:true,
        msg:"Relative added"
      });
    }
  }catch(err){
    console.log(" seeerr" +err.message);
    res.status(401).send({ message: 'Invalid Email or Password.' });
  }
})




export default router ;  