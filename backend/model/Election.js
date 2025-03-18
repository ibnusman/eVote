
import mongoose from "mongoose";

const {Schema,model} = mongoose;

const ElectionSchema = new Schema({
    position: {type:String},
    category: {type:String},
    description:{type:String},
    startDate:{type:Date},
    endDate:{type:Date}

});

const Election = mongoose.model('Election',ElectionSchema);

export default Election;
