import express from 'express'
import bodyParser from 'body-parser'
import Election from '../model/Election.js';
import Candidate from '../model/Candidate.js';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

export const createElection = async (req, res) => {
    const { position, category, description, startDate, endDate } = req.body;

    // Validate required fields
    if (!position || !category || !description || !startDate || !endDate) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Validate date format
    if (isNaN(new Date(startDate)) || isNaN(new Date(endDate))) {
        return res.status(400).json({ message: "Invalid date format. Use 'YYYY-MM-DD'." });
    }

    try {
        const newElection = await Election.create({ position, category, description, startDate, endDate });
        res.status(201).json({ message: "Election created successfully."});
       
    } catch (error) {
        console.error("Error creating election:", error.message);
        res.status(500).json({ message: `Error creating election: ${error.message}` });
    }
};

//vie election
export const viewElection = async (req, res) => {
    try {
        const storedElections = await Election.find({}, { _id: 1, position: 1, category: 1, description: 1, startDate: 1, endDate: 1 });
        res.status(200).json({ storedElections });
    } catch (error) {
        console.error("Error retrieving elections:", error.message);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

//delete election

export const deleteElection = async (req, res) => {
  try {
   const { id } = req.params;

  const deleted = await Election.deleteOne({ _id: id });

    if (deleted.deletedCount === 0) {
      return res.status(400).json({ message: "No election found to delete" });
    }

    res.status(200).json({ message: "Election deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error during deletion", error });
  }
};




//adding candidates
export const addCandidate = async (req,res) =>{
    const {name,party,about,image} = req.body;
       if(!name){
         return res.status(400).json({message:"Name is a must"});
        }
    try {
     
        const newCandidate = await Candidate.create({name,party,about,image });
       res.status(201).json({message:"Candidate add successfully"})
    } catch (error) {
        res.status(500).json({message:"Error adding candidate"})
        
    }

}

//view candidate
export const viewCandidates = async (req,res)=>{

    try {
         const candidateList = await Candidate.find({});
         if(candidateList.length === 0)
         {
            return res.status(404).json({message:"No recored found"});
         }
    // console.log(candidateList);
    res.status(200).json({candidateList})
    } catch (error) {
        console.error("Server error",error);
        res.status(500).json({message:"Error connectiing to server"});
        
    }
   
}


//delete Candidate
export const deleteCandidate = async (req,res) =>{
    try {
        const id = req.params.id;
        const removeCandidate = await Candidate.deleteOne({_id:id});
        if(removeCandidate.deletedCount === 1){
        res.status(200).json({message:"Candidate deleted succesfully"})

        }
        else{
           res.status(400).json({message:" Candidate not found "});
        }
        
    } catch (error) {
        console.error("Internal Error",error);
    }


}
//vote
export const votes = async(req,res) =>{

    const{_id,votes} = req.body;

    if(!_id || votes === undefined){
       return res.status(400).json({message:"Candidate ID and votes required"})
    }
    if(typeof votes !=="number" || votes <0)
    {
        return res.status(400).json({message:"Votes has to be a positve number"})
    }
try {
     const newVote = await Candidate.findOneAndUpdate({"_id":_id},{$inc:{votes:votes}},{new:true});
     if(!newVote){
        return res.status(404).json({message:"Candidate not found"});
     }
    res.status(200).json({message:"Voted Added succesfully",newVote})
    
} catch (error) {
   console.error("Server Error",error)
   res.status(500).json({message:"Error Adding votes"})
}
   
}

export const voteResult = async (req,res) =>{


    try {
        const electionResult = await Candidate.find({});
        res.status(200).json({message:electionResult});

// console.log(electionResult);
    } catch (error) {
        console.error("Server error ",error);
        res.status(500).json({message:"Error fatching votes"});
    }


}
