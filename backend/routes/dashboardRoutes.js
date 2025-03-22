import express from 'express'
import { viewElection,createElection, addCandidate } from '../controllers/dashboardController.js';

const app = express();

const router = express.Router();
router.post("/createElection", createElection)
router.get('/electionList',viewElection);

router.post('/addcandidate',addCandidate);


export default router;
