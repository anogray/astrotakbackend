import express from 'express';
import { getToken, isAuth } from '../util.js';
import User from '../model/userModel.js';
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/register", async (req, res) => {
  try{
    const {name,email,password} = req.body;

    //hashing the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //checking if an email is already present in the db/system
    const checkUser = await User.findOne({ email: email });

    if (checkUser) {
      return res
        .status(400)
        .json({ errorMessage: "Email is already registered !" });
    }


    const user = new User({
      name:name,
      email: email,
      password: password,
    });
    const newUser = await user.save();
      return res.send({
        success:true,
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token: getToken(newUser),
      });
}catch(err){
  console.log("got catch",err);

      res.status(409).json({ message: `${err.message} Invalid User Data.` });
    }
  })
  
router.post("/login", async(req, res)=>{
  
  try{
    const {email , password} = req.body;

    const signinUser = await User.findOne({ email: email });
    console.log({ signinUser });

    if (!signinUser) {
      return res
        .status(400)
        .json({ errorMessage: "Wrong email or password !" });
    }

    const correctPassword = await bcrypt.compare(password, signinUser.password);

    //if password entered is wrong
    if (!correctPassword) {
      return res
        .status(400)
        .json({ errorMessage: "Wrong email or password !" });
    }

    console.log({signinUser});
    
    if(signinUser){
      res.status(200).send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        token: getToken(signinUser),
      });
    }
  }catch(err){
    console.log(err.message);
    res.status(401).send({ message: 'Invalid Email or Password.' });
  }
})

router.get("/profile", isAuth, async (req, res) => {
  
  try {
    let userDetails = req.body;
    
      const updatedPost = await User.findOne(
      { _id: req.user._id },
      {password : 0}
    );
    return res.status(201).json({ status:true, "Data updated ": updatedPost });
  } catch (err) {
    console.log("errorpost"+ err);
    res.status(404).json({ errorMessage: "Error in Updating Unkown Post " });
  }
});
router.post("/profile", isAuth, async (req, res) => {
  
  try {
    let updatePost = req.body;
    
      const updatedPost = await User.updateOne(
      { _id: req.user._id },
      updatePost
    );
    return res.status(201).json({ status:true, "Data updated ": updatedPost });
  } catch (err) {
    console.log("errorpost"+ err);
    res.status(404).json({ errorMessage: "Error in Updating Unkown Post " });
  }
});


export default router ;  