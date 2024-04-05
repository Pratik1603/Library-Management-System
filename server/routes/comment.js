import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createComment,
  deleteComment,
  editComment,
  getBookComments,
  likeComment,
  getmostLikedComments,
} from '../controllers/commentController.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getBookComments/:bookId', getBookComments);
router.get('/getMostLikedComments/:bookId',getmostLikedComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);

export default router;