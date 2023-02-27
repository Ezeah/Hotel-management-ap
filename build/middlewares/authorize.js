"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorize = (req, res, next) => {
    // Check if user is admin
    const user = req.user; // Cast the req.user object to the User interface
    if (user && user.isAdmin) {
        next(); // User is admin, continue to next middleware or route handler
    }
    else {
        res.status(401).json({ message: 'Unauthorized' }); // User is not admin, send unauthorized error
    }
};
exports.default = authorize;
