import mongoose from "mongoose";

const {Schema,model} = mongoose;

const CandidateSchema = new Schema ({
    name : {type:String},
    party: {type:String},
    about: {type:String},
    image: {type:String},
    votes: {
    type: Number,
    default: 0, 
    min: 0,    
  },
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Election",
    required: true,
  },
});

const Candidate = model("Candidate", CandidateSchema)

export default Candidate;
