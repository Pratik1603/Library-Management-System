import { errorHandler } from '../utils/error.js';
import Issue from '../models/issue.js';

import Book from '../models/book.js';
import User from '../models/user.js';
export const create = async (req, res, next) => {
    
    if (!req.body.bookId) {
      return next(errorHandler(400, 'Please provide the book to be issued'));
    }
    const bookId=req.body.bookId;
    const librarianId=req.body.librarianId;
    const patronId=req.body.patronId;
    const patron=await User.findById(patronId);
    if (patron.books.includes(bookId)) {
      return res.status(400).json({ message: 'Book already exists with you' });
    }
    const newIssue= new Issue({
      ...req.body,
      patronId: req.user.id,
      books:[bookId],
      librarian:[librarianId],
      patron:[patronId],
    });
    
    try {
      const savedIssue = await newIssue.save();
      
      res.status(201).json(savedIssue);
    } catch (error) {
      next(error);
    }
  };
  
  export const getissues = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 3;
      const issues = await Issue.find({
        ...(req.query.patronId && { patronId: req.query.patronId }),
        ...(req.query.bookId && { bookId: req.query.bookId }),
        ...(req.query.librarianId && { librarianId: req.query.librarianId }),
        ...(req.query.isApproved && {isApproved:req.query.isApproved}),
        ...(req.query.issueClosed && {issueClosed:req.query.issueClosed}),
      })
        .sort({ updatedAt: -1 }).skip(startIndex).limit(limit);
        
      const totalIssues = await Issue.countDocuments();
      const approvedIssue=await Issue.countDocuments({isApproved:true});
      const pendingIssue=await Issue.countDocuments({isApproved:false})
      
  
      res.status(200).json({
        issues,
        totalIssues,
        pendingIssue,
        approvedIssue,
      });
    } catch (error) {
      next(error);
    }
  };

  export const getIssueBooksLib=async(req,res,next)=>{
    try {
      const issueId = req.params.issueId;
      
      
      const issue = await Issue.findById(issueId).populate('books','name category imageUrl slug  -_id').populate('librarian','username profilePicture -_id').populate('patron','username profilePicture -_id');
      
      if(!issue){ 
          return res.status(404).json({ error: 'issue not found' });
      }
   
      const bookIssued= issue.books;
      res.status(200).json({issue});
  }
  catch(err) {
      next(err);
  }
  }
 
  export const approveIssue=async (req, res, next) => {
    const issueId = req.params.issueId;
    const issue = await Issue.findById(issueId);
    // if(req.user.id !==issue.librarianId){
    //     return next(errorHandler(403,'You are not allowed to approve this issue'));
    // }
    try {
        
       
      if (!issue) {
        return res.status(404).json({ message: 'Issue not found' });
      }
  
      const currentDate = new Date();
        issue.isApproved = true;
        issue.issueApprovedDate = currentDate.toLocaleDateString('en-GB'); // Format as 'DD/MM/YYYY'
        
        // Calculate return date by adding weeks to the approve date
        const weeks = issue.issuePeriod;
        const returnDate = new Date(currentDate.getTime() + (weeks * 7 * 24 * 60 * 60 * 1000));
        issue.bookReturnDateExpec = returnDate.toLocaleDateString('en-GB'); // Format as 'DD/MM/YYYY'
  
      await issue.save();
      res.status(200).json(issue);
      } catch (error) {
        next(error);
    }

  }
  export const returnBook=async (req, res, next) => {
    if(req.user.id !== req.params.patronId){
        return next(errorHandler(403,'You have not issued this book'));
    }
    try {
        const currentDate = new Date();
        const issueId = req.params.issueId;
        const issue = await Issue.findById(issueId);
        
        issue.isBookRetn=true;
        issue.isApproved=false;

        issue.bookReturnedDate=currentDate.toLocaleDateString('en-GB');
    
   
      await issue.save();
      res.status(200).json(issue);
      } catch (error) {
        next(error);
    }

  }

  export const closeIssue=async (req, res, next) => {
    // if(req.user.id !== req.params.librarian){
    //     return next(errorHandler(403,'You are not allowed to approve this issue'));
    // }
    try {
        const issueId = req.params.issueId;
        const issue = await Issue.findById(issueId);
        if(issue.isBookRetn==true){
          issue.issueClosed=true;
        }
        else{
          return next(errorHandler(403,'The book is not returned yet'));
        }
        
      
       
      await issue.save();
      res.status(200).json(issue);
      } catch (error) {
        next(error);
    }

  }

  export const deleteIssue = async (req, res, next) => {
    // if(!req.user.isOwner){
    //     if(req.user.id !== req.params.librarian){
    //         return next(errorHandler(403,'You are not allowed to delete this issue'));
    //     }
       
    // }
    try {
      await Issue.findByIdAndDelete(req.params.issueId);
      res.status(200).json('The issue has been deleted');
    } catch (error) {
      next(error);
    }
  };
  
