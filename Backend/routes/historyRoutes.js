const express = require('express');
const { addHistory, getHistory } = require('../controllers/historyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, addHistory);  // Add search history (requires authentication)
router.get('/', protect, getHistory);  // Get search history (requires authentication)

module.exports = router;
