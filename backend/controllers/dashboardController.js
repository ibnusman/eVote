import express from 'express'
import bodyParser from 'body-parser'
import Election from '../model/Election.js';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


export const createElection = async (req,res) =>{
    const {position,category,description,startDate,endDate} = req.body;

    try {
        
        if(isNaN (new Date(startDate)) || isNaN(new Date(endDate)))
        {
            return res.status(400).json({message:"Invalid date formart use Y-M-D"})
        }

      const addElection =  await Election.create({position,category,description,startDate,endDate})
        
        res.status(201).json({message:"Election created successfully"});
        console.log(addElection)
    } catch (error) {
        res.status(400).json({message: `error Creating election ${error.message}`})
        console.log(error)
        
    }
}

export const viewElection = async (req,res) =>{

    try{
    const storedElection = await Election.find();
//    console.log(storedElection[1])
const selectedlction =  storedElection.forEach(function(elc){
    const testing = [{
        position:elc.position,
        category:elc.category,
        description:elc.description,
        startDate:elc.startDate,
        endDate:elc.endDate,

    }]
   res.status(201).json({message:`${selectedlction}`})
});

    // res.status(200).json({storedElection});
    } catch(error){
        console.log(error);
    }
}
