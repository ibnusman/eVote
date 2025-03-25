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
});

const Candidate = model("Candidate", CandidateSchema)

export default Candidate;
