const {handleGenerateShortUrl,handleGetRedirectUrl,handleGetAnalytics} = require('../controllers/urlController');
const express = require("express");

const router = express.Router();

router.post('/',handleGenerateShortUrl);
router.get('/:shortid',handleGetRedirectUrl);
router.get('/analytics/:shortid',handleGetAnalytics);

module.exports = router;