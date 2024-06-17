// routes/task.js
import { Router } from 'express';
import { Task } from '../models/index.js';
import authMiddleware from '../authMiddleware.js';

const router = Router();


router.post('/', authMiddleware, async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      userId: req.user.uid, 
    };
    const task = await Task.create(taskData);
    res.status(201).json(task);
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: error.message });
  }
});


router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.uid } });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.uid } });
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.uid } });
    if (task) {
      await task.update(req.body);
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.uid } });
    if (task) {
      await task.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
