  
import mongoose from 'mongoose';


const birthDetailsObj  = {
  day:{ type: Number },
  month:{ type: Number },
  year:{ type: Number },
  tobhr:{ type: Number },
  tobmin:{ type: Number },
  meridian:{ type: String }
}


const relativeSchema = new mongoose.Schema({
  userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  birthDetails : birthDetailsObj,
  birthlocation:{ type: String },
  gender: { type: String },
  relation:{ type: String },
  pincode:{ type: String }
  
});

const Relatives = mongoose.model('Relatives', relativeSchema);

export default Relatives ;