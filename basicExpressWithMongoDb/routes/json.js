const express = require('express');
const router = express.Router();

const jsonController = require("../controllers/jsonController");

router.get("/", jsonController.json);
router.get("/random", jsonController.random);


module.exports = router;

