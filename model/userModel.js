  
import mongoose from 'mongoose';


const birthDetails  = {
  day:{ type: Number },
  month:{ type: Number },
  year:{ type: Number },
  tobhr:{ type: Number },
  tobmin:{ type: Number },
  meridian:{ type: String }
}

const addressObj  = {
  address:{ type: String },
  addressmore:{ type: String },
}

const language  = {
  id:{ type: Number },
  name:{ type: String },
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, index: true,
  },
  password: { type: String, required:true},
  phonecode:{ type: String},
  phonenumber: { type: String},
  gender: { type: String },
  languageObj: language,
  martial:{ type: String },
  birthDetails : birthDetails,
  addressObj: addressObj,
  birthlocation:{ type: String },
  statelocation:{ type: String },
  city:{ type: String },
  pincode:{ type: String }
  
});

const User = mongoose.model('User', userSchema);

export default User ;