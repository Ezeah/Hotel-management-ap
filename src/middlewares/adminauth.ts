import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import Authenticate from '../interfaces/adminauth.interface';
import User from '../models/user.model';

const adminAuth = async (req: Authenticate, res: Response, next: NextFunction) => {
  try {
    // Extract token from Authorization header and verify it
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error('No token provided');
    }
    const decoded: any = jwt.verify(token, 'blublablue');

    // Find user with matching id and token
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    // If no user is found, throw an error
    if (!user) {
      throw new Error();
    }

    // Check if user is an admin
    const isAdmin = user.role === 'admin';

    // If user is not an admin, throw an error
    if (!isAdmin) {
      throw new Error();
    }

    // Add token and user to request object and pass control to next middleware
    req.token = token;
    req.admin = user;
    next();
  } catch (error) {
    // If any errors occur during verification, send a 401 Unauthorized response
    res.status(401).send({ error: 'Unauthorized access' });
  }
};

export default adminAuth;
