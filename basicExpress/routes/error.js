const express = require('express');
const router = express.Router();
const errorController = require('../controllers/errorController');

router.use(errorController.notFound);
router.use(errorController.handleError);

module.exports = router;
