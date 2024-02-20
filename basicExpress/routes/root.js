const express = require('express');
const router = express.Router();

const rootController = require('../controllers/RootController');

router.get('/', rootController.handleRootRequest);

module.exports = router;

