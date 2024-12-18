const express = require('express');
const router = express.Router();
const newsController = require('../controller/manoramaNews');

router.get('/:type', newsController.getNews);
router.get('/reels/:type', newsController.getReels);
router.get('/banner/:type', newsController.getBanner);

module.exports = router;
