const express = require('express');
const router = express.Router();
const {
  createUrl,
  getAllUrls,
  getUrlStats,
  deleteUrl,
} = require('../controllers/urlController');

router.post('/urls', createUrl);
router.get('/urls', getAllUrls);
router.get('/urls/:shortCode/stats', getUrlStats);
router.delete('/urls/:shortCode', deleteUrl);

module.exports = router;
