import express from 'express';
import { addHistory, getHistory } from '../controllers/historyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addHistory);  // Add search history (requires authentication)
router.get('/', protect, getHistory);  // Get search history (requires authentication)

export default router;
