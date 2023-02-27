import { string } from 'joi';
import { Admin } from 'mongodb';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

interface User {
  // Define the user interface, including an optional isAdmin property
  name: string;
  email: string;
  isAdmin?: boolean;
}

const adminUser: User = {
  name: 'Admin',
  email: 'admin@example.com',
  isAdmin: true,
};

export default User; 
;
  