import express from 'express'
import bodyParser from 'body-parser'
import Election from '../model/Election.js';
import Candidate from '../model/Candidate.js';
import User from '../model/User.js';


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

//view election
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
    const {name,party,about,image,electionId} = req.body;
   
       if(!name){
         return res.status(400).json({message:"Name is a must"});
        }
    try {
     
        const newCandidate = await Candidate.create({name,party,about,image,electionId });
       res.status(201).json({message:"Candidate add successfully"})
    } catch (error) {
        res.status(500).json({message:"Error adding candidate"})
        console.log(error)
        
    }

}


//Adding a candidate using election

// export const addCandidate = async (req,res) =>{
//     const {name,party,about,image} = req.body;
//        if(!name){
//          return res.status(400).json({message:"Name is a must"});
//         }
//     try {
     
//         const newCandidate = await Election.create({candidate: [name,party,about,image]});
//        res.status(201).json({message:"Candidate add successfully"})
//     } catch (error) {
//         res.status(500).json({message:"Error adding candidate",error})
        
//     }

// }




//view candidate
export const viewCandidates = async (req,res)=>{
  const { electionId } = req.params;
// console.log(electionId);
    try {
         const candidateList = await Candidate.find({electionId:electionId});
         if(candidateList.length === 0)
         {
        
            return res.status(404).json({message:"No recored found"});
         }
    // console.log(candidateList);
    res.status(200).json({candidateList})
        // console.log(candidateList);
    } catch (error) {
        console.error("Server error",error);
        res.status(500).json({message:"Error connectiing to server"});
        
    }
   
}


//delete Candidate
export const deleteCandidate = async (req,res) =>{
    try {
        const {id} = req.params;
        const removeCandidate = await Candidate.deleteOne({_id:id});
        if(removeCandidate.deletedCount === 0){
        return res.status(400).json({message:"Candidate not found"})

        }
  
        res.status(200).json({message:" Candidate deleted succesfully "});
  
        
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


// election result 
export const voteResult = async (req,res) =>{
    const {electionId} = req.params;

    try {
        const electionResult = await Candidate.find({electionId:electionId});
        res.status(200).json({message:electionResult});

// console.log(electionResult);
    } catch (error) {
        console.error("Server error ",error);
        res.status(500).json({message:"Error fatching votes"});
    }


}


//check voting status
// Check the user's vote status
export const voteStatus = async (req, res) => {
    const { id } = req.body;  // Assuming you're passing the user's ID in the body

    try {
        // Find the user by ID and return their voting status
        const userVote = await User.findOne({ _id: id }, { voted: 1 });
        res.status(200).json({ userVote }); // Return the vote status
    } catch (error) {
        console.error("Error checking vote status:", error);
        res.status(500).json({ error: "Internal server error" }); // Handle server errors
    }
}

// Update the user's vote status
export const updateVote = async (req, res) => {
    const { id, vstatus } = req.body;

    if (!id || typeof vstatus !== "boolean") {
        return res.status(400).json({ message: "Invalid request. ID and vstatus are required." });
    }

    try {
        const updateVotes = await User.updateOne(
            { _id: id },
            { 
                $set: { voted: vstatus },
                $currentDate: { lastUpdated: true }
            }
        );

        if (updateVotes.modifiedCount === 0) {
            return res.status(404).json({ message: "User not found or vote status not updated." });
        }

        res.status(200).json({ message: "Vote status updated successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error while updating vote." });
    }
};
