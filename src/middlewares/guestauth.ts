import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import AuthenticatedRequest from '../interfaces/guestauth.interface';


const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Extract token from Authorization header and verify it
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error('No token provided');
    }
    const decoded: any = jwt.verify(token, 'mytaskersecret');

    // Find user with matching id and token
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    // If no user is found, throw an error
    if (!user) {
      throw new Error();
    }

    // Add token and user to request object and pass control to next middleware
    req.token = token;
    req.guest = user;
    next();
  } catch (error) {
    // If any errors occur during verification, send a 401 Unauthorized response
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export default auth;
