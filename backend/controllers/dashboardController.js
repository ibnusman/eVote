import express from 'express'
import bodyParser from 'body-parser'


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


export const createElection = async (req,res) =>{
    const {position,category,description,startDate,endDate} = req.body;

    try {
        
    } catch (error) {
        
    }
}
