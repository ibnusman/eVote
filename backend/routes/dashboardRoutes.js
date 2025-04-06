import express from 'express'
import { viewElection,createElection, addCandidate, viewCandidates, votes, voteResult, deleteElection } from '../controllers/dashboardController.js';
import { checkRole, verifyToken } from '../middleware/authMiddleware.js';
import { Admin } from 'mongodb';

const app = express();

const router = express.Router();
//election
router.post("/createElection",verifyToken, checkRole(["admin"]), createElection)
router.get('/electionList',viewElection);
router.post("/deleteElection", deleteElection)

//candidate
router.post('/addcandidate',verifyToken,checkRole(["admin"]), addCandidate);
router.get('/candidatelist',viewCandidates);

//votes
router.post('/vote',votes);

router.get('/result',verifyToken,checkRole(["admin"]),voteResult);


export default router;
