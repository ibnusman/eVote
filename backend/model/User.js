import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  fname: { type: String, required: true },
  sname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  username: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  role: {type:String,
         enum:["admin","election_officer","voter"],
         default:"voter"
    }

},  { timestamps: true });



const User = model("User", UserSchema);

export default User;
