import express from 'express'
import { viewElection,createElection, addCandidate, viewCandidates, votes, voteResult } from '../controllers/dashboardController.js';
import { checkRole, verifyToken } from '../middleware/authMiddleware.js';
import { Admin } from 'mongodb';

const app = express();

const router = express.Router();
router.post("/createElection",verifyToken, checkRole(["admin"]), createElection)
router.get('/electionList',verifyToken,viewElection);

router.post('/addcandidate',addCandidate);
router.get('/candidatelist',viewCandidates);

//votes
router.post('/vote',votes);

router.get('/result',voteResult);


export default router;
