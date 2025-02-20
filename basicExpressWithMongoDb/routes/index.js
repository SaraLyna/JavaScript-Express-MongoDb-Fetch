const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.home);
router.get("/first", indexController.first);
router.get("/second", indexController.second);


module.exports = router;
