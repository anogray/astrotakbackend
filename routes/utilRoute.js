import express from 'express';
import { isAuth } from '../util.js';
import config from '../config.js';
import axios from 'axios';


const router = express.Router();


router.get("/", async (req, res) => {
  
    

    try {
        let {str} = req.query
        console.log("seeParams",str);
        console.log("see",`${config.LOCATION_URL}${str}`);
      let {data} = await axios.get(`${config.LOCATION_URL}${str}`);
      console.log("checkdt",data);

      if(data){
        return res.status(201).json({ status:true, "data": data.data});
      }
      
      return  res.status(201).json({ status:true, "empty": true });
      
    } catch (err) {
        console.log({err});
      res.status(404).json({ status:false, errorMessage: "Error in Receiving Location " });
    }
  });


  export default router;