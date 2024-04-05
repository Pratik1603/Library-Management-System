import express from 'express';
import { create, deletebook, getbooks,addRating} from '../controllers/bookController.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create',verifyToken, create);
router.get('/getbooks',getbooks);
router.delete('/deletebook/:bookId/:userId',verifyToken, deletebook)
router.put('/addRating/:bookId',verifyToken,addRating);
export default router;