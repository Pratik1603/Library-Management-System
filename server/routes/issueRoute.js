import express from 'express';
import { create,deleteIssue,getissues,approveIssue,closeIssue,returnBook} from '../controllers/issueController.js';
import { verifyToken } from '../utils/verifyUser.js';
import { getIssueBooksLib } from '../controllers/issueController.js';
export const router = express.Router();

router.post('/create',verifyToken, create);
router.get('/getissues',getissues);
router.get('/getIssueBooksLib/:issueId',getIssueBooksLib);
router.delete('/deleteissue/:issueId/:librarianId',verifyToken,deleteIssue)
router.put('/approveIssue/:issueId/:librarianId',verifyToken,approveIssue);
router.put('/closeIssue/:issueId/:librarianId',verifyToken,closeIssue);
router.put('/returnBook/:issueId/:patronId',verifyToken,returnBook);

export default router;