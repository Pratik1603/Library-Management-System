import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  signout,
  test,
  updateUser,
  getUserBooks,
  addBook,
  deleteBook,
  getUserPatrons,
  addPatron,
  createLibrarian,
  getUserLibrarians,
  deleteLibrarian,
} from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);
router.get('/getUserBooks/:userId',getUserBooks);
router.put('/addBook/:patronId/:bookId/:librarianId',verifyToken,addBook);
router.get('/getUserPatrons/:userId',getUserPatrons);
router.get('/getUserLibrarians/:userId',getUserLibrarians);
router.put('/addPatron/:userId/:patronId',addPatron);
router.put('/deleteBook/:patronId/:bookId/:librarianId',verifyToken,deleteBook);
router.put('/addLibrarian',verifyToken,createLibrarian);
router.put('/deleteLibrarian/:librarianId',verifyToken,deleteLibrarian);

export default router;