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
    const storedElection = await Election.find({},{_id:0,position:1,category:1,description:1,startDate:1,endDate:1});


    res.status(200).json({storedElection});
    } catch(error){
        console.log(error);
    }
}
