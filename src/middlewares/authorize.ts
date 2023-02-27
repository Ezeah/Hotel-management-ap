import { NextFunction, Request, Response } from "express";
import app from "../app";
import authorize from "../interfaces/authorize.interface";

interface User {
    name: string;
    email: string;
    isAdmin: boolean;
  }
  
  const authorize = (req: Request, res: Response, next: NextFunction) => {
    // Check if user is admin
    const user: User = req.user as User; // Cast the req.user object to the User interface
    if (user && user.isAdmin) {
      next(); // User is admin, continue to next middleware or route handler
    } else {
      res.status(401).json({ message: 'Unauthorized' }); // User is not admin, send unauthorized error
    }
  };

  export default authorize;
  
