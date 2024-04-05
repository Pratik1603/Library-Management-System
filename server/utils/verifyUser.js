import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
export const verifyToken = (req, res, next) => {
  
  const cookieHeader = req.headers.cookie;
  // console.log(cookieHeader);
// Parse the cookie header to get individual cookies
const cookies = cookieHeader?.split(';').reduce((cookiesObject, cookie) => {
    const [name, value] = cookie.trim().split('=');
    cookiesObject[name] = value;
    return cookiesObject;
}, {});

// Access the access_token and userId from the cookies
const token = cookies.access_token;

// console.log(userId);
// console.log(accessToken);
  // const token = req.cookie.access_token;
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};