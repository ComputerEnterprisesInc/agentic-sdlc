const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const { authenticate } = require('../middleware/auth');

// Validation middleware
const validateTask = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional().trim(),
  body('status').optional().isIn(['todo', 'in-progress', 'done']).withMessage('Invalid status'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority')
];

// Get all tasks
router.get('/', authenticate, async (req, res, next) => {
  try {
    const tasks = await Task.findAll(req.user.id);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

// Get tasks by status
router.get('/status/:status', authenticate, async (req, res, next) => {
  try {
    const { status } = req.params;
    if (!['todo', 'in-progress', 'done'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const tasks = await Task.findByStatus(status, req.user.id);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

// Get single task
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (task.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
});

// Create task
router.post('/', authenticate, validateTask, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const taskData = {
      ...req.body,
      user_id: req.user.id
    };
    
    const task = await Task.create(taskData);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

// Update task
router.put('/:id', authenticate, validateTask, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if task exists and belongs to user
    const existingTask = await Task.findById(req.params.id);
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (existingTask.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const task = await Task.update(req.params.id, req.body);
    res.json(task);
  } catch (error) {
    next(error);
  }
});

// Delete task
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    // Check if task exists and belongs to user
    const existingTask = await Task.findById(req.params.id);
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (existingTask.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const result = await Task.delete(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
