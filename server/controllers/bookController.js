import { errorHandler } from '../utils/error.js';
import Book from '../models/book.js';

export const create = async (req, res, next) => {
    // if (!req.user.isLibrarian && !req.user.isOwner) {
    //   return next(errorHandler(403, 'You are not allowed to create a Book'));
    // }
    if (!req.body.name || !req.body.description || !req.body.author || !req.body.publisher 
        || !req.body.date || !req.body.imageUrl || !req.body.category || !req.body.price || !req.body.totalCopies) {
      return next(errorHandler(400, 'Please provide all required fields'));
    }
    const slug = req.body.name
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');
     
    const newBook = new Book({
      ...req.body,
      slug,
      userId: req.user.id,
    });


    try {
      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (error) {
      next(error);
    }
  };
  
  export const getbooks = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 12;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
      const books = await Book.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.bookId && { _id: req.query.bookId }),
        ...(req.query.author && { author: req.query.author }),
        ...(req.query.publisher && { publisher: req.query.publisher }),
        ...(req.query.searchTerm && 
            { name: { $regex: req.query.searchTerm, $options: 'i' } }
           
        
        ),
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
  
      const totalBooks = await Book.countDocuments();
  
      
  
      res.status(200).json({
        books,
        totalBooks,
      });
    } catch (error) {
      next(error);
    }
  };
  export const addRating=async(req,res,next)=>{
    try {
      const bookId = req.params.bookId;
   
      const rating = req.body.rating; 
  
      const book = await Book.findById(bookId);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      
      book.rating.push(rating);
      let sumOfRatings=0;
      for (let i = 0; i < book.rating.length; i++) {
        sumOfRatings += book.rating[i];
    }
   
      book.ratingOver = Math.ceil((sumOfRatings)/ (book.rating.length));
  
      await book.save();
      res.status(200).json(book);
    } catch (error) {
      
      next(error);
    }
  }
  export const deletebook = async (req, res, next) => {
    if(!req.user.isOwner){
        if(!req.user.isLibrarian){
            return next(errorHandler(403,'You are not allowed to delete this book'));
        }
        else if(req.user.id !== req.params.userId){
            return next(errorHandler(403,'You are not allowed to delete this book'));
        }
    }
    try {
      await Book.findByIdAndDelete(req.params.bookId);
      res.status(200).json('The book has been deleted');
    } catch (error) {
      next(error);
    }
  };
  
