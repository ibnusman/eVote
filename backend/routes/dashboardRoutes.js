import express from 'express'
import { viewElection,createElection, addCandidate, viewCandidates, votes, voteResult } from '../controllers/dashboardController.js';

const app = express();

const router = express.Router();
router.post("/createElection", createElection)
router.get('/electionList',viewElection);

router.post('/addcandidate',addCandidate);
router.get('/candidatelist',viewCandidates);

//votes
router.post('/vote',votes);

router.get('/result',voteResult);


export default router;
