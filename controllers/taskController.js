const Task = require('../models/task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ error: 'No tasks found' });
    }
    res.json(tasks);
  } catch (error) {
    res.send(err.message);
  }
};


exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate ,completed} = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    if (!dueDate) {
      return res.status(400).json({ error: 'Due date is required' });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      completed
    });

    res.json(task);
  } catch (err) {
    res.send(err.message);
  }
};


exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(400).json({ error: 'Task ID is required' });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.send(err.message);
  }
};


exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(400).json({ error: 'Task ID is required' });
    }
    
    const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch(err) {
    res.send(err.message);
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(400).json({ error: 'Task ID parameter is required' });
    }
    const task = await Task.findByIdAndDelete(taskId);
    res.json(task);
  } catch (err) {
    res.send(err.message);
  }
};
