import express from 'express'
import { viewElection,createElection } from '../controllers/dashboardController.js';

const app = express();

const router = express.Router();
router.post("/createElection", createElection)
router.get('/electionList',viewElection);

export default router;
