import User from '../models/user.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as cookie from 'cookie';

dotenv.config();
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  
  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }
  if (req.body.username.length < 7 || req.body.username.length > 20) {
    return next(
      errorHandler(400, 'Username must be between 7 and 20 characters')
    );
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json('Signup successful');
  } 
  catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {

  const { username, password } = req.body;

  if (!username || !password || username === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ username });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id, isOwner: validUser.isOwner },
      process.env.JWT_SECRET
    );
   
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        
      })
      .json(rest);
  } catch (error) {
   
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isOwner: user.isOwner },
        process.env.JWT_SECRET
      );
   
      const { password: pass, ...rest } = user._doc;
     
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: false,
        })
        .json(rest);
        
        

    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isOwner: newUser.isOwner },
        process.env.JWT_SECRET
      );
     
      const { password, ...rest } = newUser._doc;
      res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        // domain: 'localhost',
        // path: '/',
        // secure: false, // Change to true if using HTTPS
        // sameSite: 'strict' // Adjust as needed for your requirements
      })
      .json(rest);
    }
  } catch (error) {
    next(error);
  }
};