import express from 'express'
import { viewElection,createElection, addCandidate, viewCandidates, votes, voteResult, deleteElection, deleteCandidate, voteStatus, updateVote } from '../controllers/dashboardController.js';
import { checkRole, verifyToken } from '../middleware/authMiddleware.js';
import { Admin } from 'mongodb';

const app = express();

const router = express.Router();
//election
router.post("/createElection",verifyToken, checkRole(["admin"]), createElection)
router.get('/electionList',viewElection);
router.delete("/deleteElection/:id", deleteElection);

//candidate
// router.post('/addcandidate',verifyToken,checkRole(["admin"]), addCandidate);
 router.post('/addcandidate', addCandidate);



router.get('/candidatelist/:electionId',viewCandidates);
router.delete("/deleteCandidate/:id",deleteCandidate)

//votes
router.post('/vote',votes);
router.post('/voteStatus',voteStatus);

router.post('/updateVote',updateVote);


router.get('/result/:electionId',verifyToken,checkRole(["admin"]),voteResult);


export default router;
