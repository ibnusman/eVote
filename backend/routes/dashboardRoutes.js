import express from 'express';
import { viewElection, createElection, addCandidate, viewCandidates, votes, voteResult, deleteElection, deleteCandidate, voteStatus, updateVote } from '../controllers/dashboardController.js';
import { checkRole, verifyToken } from '../middleware/authMiddleware.js';

const app = express();
const router = express.Router();

/**
 * @swagger
 * /api/dashboard/createElection:
 *   post:
 *     summary: Create a new election
 *     description: Creates a new election in the system
 *     parameters:
 *       - in: body
 *         name: election
 *         description: Election details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       201:
 *         description: Election created successfully
 *       500:
 *         description: Server error
 */
router.post("/createElection", verifyToken, checkRole(["admin"]), createElection);

/**
 * @swagger
 * /api/dashboard/electionList:
 *   get:
 *     summary: Get list of elections
 *     description: Retrieves all elections in the system
 *     responses:
 *       200:
 *         description: List of elections
 *       500:
 *         description: Server error
 */
router.get('/electionList', viewElection);

router.delete("/deleteElection/:id", deleteElection);

router.post('/addcandidate', addCandidate);

router.get('/candidatelist/:electionId', viewCandidates);
router.delete("/deleteCandidate/:id", deleteCandidate);

router.post('/vote', votes);
router.post('/voteStatus', voteStatus);
router.post('/updateVote', updateVote);

router.get('/result/:electionId', verifyToken, checkRole(["admin"]), voteResult);

export default router;
