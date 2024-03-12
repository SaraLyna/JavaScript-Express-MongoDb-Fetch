const express = require('express');
const Task = require('../models/task');

const TaskController = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  
  createTask: async (req, res) => {
    try {
      const task = new Task(req.body);
      await task.save();
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  
  deleteTask: async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.taskId);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = TaskController;

