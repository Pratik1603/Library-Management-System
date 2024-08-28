import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.js';

export const test = (req, res) => {
  res.json({ message: 'API is working!' });
};
export const addBook=async(req,res,next)=>{
  try{
    const patronId = req.params.patronId; 
    const bookId  = req.params.bookId; 
    // if(req.user.id!=req.params.librarian){
    //   return res.status(404).json({ message: 'You are not allowed to approve'});
    // }
    const patron = await User.findById(patronId);

    if (!patron) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (patron.books.includes(bookId)) {
      return res.status(400).json({ message: 'Book already exists with you' });
    }
    patron.books.push(bookId);
    await patron.save();

  
    return res.status(200).json({ message: 'Book added successfully' });
  }
  catch(err){
    next(err);
  }
}

export const addPatron = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const patronId = req.params.patronId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isLibrarian && !user.isOwner) {
      return res.status(403).json({ message: 'User not authorized' });
    }
    if (user.patrons.includes(patronId)) {
      return res.status(400).json({ message: 'Patron already exists for this user' });
    }

    user.patrons.push(patronId);

    await user.save();

    if (user.isLibrarian) {
      const admin = await User.findOne({ isOwner: true });
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      if (!admin.patrons.includes(patronId)) {
        
        admin.patrons.push(patronId);
        await admin.save();
      }
    }

    return res.status(200).json({ message: 'Patron added successfully' });
  } catch (err) {
    next(err);
  }
}

export const deleteBook=async(req,res,next)=>{
  try{
    const patronId = req.params.patronId; 
    const bookId  = req.params.bookId; 
    if(req.user.id!=req.params.librarianId){
      return res.status(404).json({ message: 'You are not allowed to approve'});
    }
    
    const patron = await User.findById(patronId);

    if (!patron) {
      return res.status(404).json({ message: 'User not found' });
    }

    patron.books = patron.books.filter((id) => id.toString() !== bookId);

    await patron.save();

  
    return res.status(200).json({ message: 'Book deleted successfully' });
  }
  catch(err){
    next(err);
  }
}

export const deleteLibrarian=async(req,res,next)=>{
  try{
    const userId=req.user.id;
    const librarianId  = req.params.librarianId; 
 
    const owner = await User.findById(userId);
    const librarian=await User.findById(librarianId);
    
    if (!owner) {
      console.log("l");
      return res.status(404).json({ message: '  Owner not found' });
    }
    if(!owner.isOwner){
      console.log("k");
      return res.status(404).json({ message: 'Not authorised to delete' });
    }
    owner.librarians = owner.librarians.filter((id) => id.toString() !== librarianId);
    librarian.isLibrarian=false;
    await librarian.save();
    await owner.save();
  
    return res.status(200).json({ message: 'Librarian deleted successfully',user:owner });
  }
  catch(err){
    next(err);
  }
}
export const updateUser = async (req, res, next) => {
  
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 7 and 20 characters')
      );
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'Username can only contain letters and numbers')
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
          isOwner:req.body.isOwner,
          isLibrarian:req.body.isLibrarian,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find({
      ...(req.query.isLibrarian && { isLibrarian: req.query.isLibrarian }),
      ...(req.query.username && { username: req.query.username }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const createLibrarian=async(req,res,next)=>{
  const { username } = req.body;

  try {
    
    const user = await User.findOne({ username });
    const admin=await User.findById(req.user.id);
    
    if(!admin.isOwner){
     
      return res.status(404).json({ message: 'Not Authorised' });
    }
    if (!user) {
    
      return res.status(404).json({ message: 'User not found.' });
    }
    if(user.isLibrarian){
     
      return res.status(404).json({ message: 'User is already a librarian' });
    }
    
    await User.findByIdAndUpdate(user._id, { isLibrarian: true });

    await User.findByIdAndUpdate(req.user.id, { $push: { librarians: user._id } });

    return res.status(200).json({ message: 'Librarian added successfully.',user:user });
  } catch (error) {
 
    next(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
 
}


export const getUserBooks=async(req,res,next)=>{
  try {
    const userId = req.params.userId;
    
    
    const user = await User.findById(userId).populate({
      path:'books',
    
    });
    
    if(!user){ 
        return res.status(404).json({ error: 'user not found' });
    }
    console.log(user);
    const book= user.books;
    res.status(200).json({user});
}
catch(err) {
    next(err);
}
}

export const getUserLibrarians=async(req,res,next)=>{
  try {
    const userId = req.params.userId;
    
    const user = await User.findById(userId).populate({
      path:'librarians',
    
    });
    
    if(!user){ 
        return res.status(404).json({ error: 'user not found' });
    }
    console.log(user);
    const book= user.librarians;
    res.status(200).json({user});
}
catch(err) {
    next(err);
}
}
export const getUserPatrons=async(req,res,next)=>{
  try {
    const userId = req.params.userId;
   
    const user = await User.findById(userId);
    if(!user.isLibrarian && !user.isOwner){
      return res.status(404).json({ error: 'user not authorised' });
    }
    await user.populate('patrons')
    
    if(!user){ 
        return res.status(404).json({ error: 'user not found' });
    }
   
    const patron= user.patrons;
    res.status(200).json({user});
}
catch(err) {
    next(err);
}
}