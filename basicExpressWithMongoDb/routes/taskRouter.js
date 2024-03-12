const express = require('express');
const TaskController = require('../controllers/taskController');

const router = express.Router();

router.get('/', TaskController.getAllTasks);

router.post('/', TaskController.createTask);

router.delete('/:taskId', TaskController.deleteTask);

module.exports = router;

