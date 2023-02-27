import express, { Request, Response } from 'express';
import authorize from '../middlewares/authorize';

const router = express.Router();

// Route to create a new room type
router.post('/room-types', authorize, async (req: Request, res: Response) => {
  // Only admins can access this route
  try {
    // Add new room type logic here
    res.status(201).json({ message: 'Room type created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update an existing room type
router.put('/room-types/:id', authorize, async (req: Request, res: Response) => {
  // Only admins can access this route
  try {
    // Update room type logic here
    res.status(200).json({ message: 'Room type updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete an existing room type
router.delete('/room-types/:id', authorize, async (req: Request, res: Response) => {
  // Only admins can access this route
  try {
    // Delete room type logic here
    res.status(200).json({ message: 'Room type deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
