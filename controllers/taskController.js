const Task = require('../models/task');

exports.getAllTasks = async (req, res) =>
 {
  try{
    const tasks = await Task.find({});
    res.json(tasks);
  }catch(err){
    res.send(err.message);
  }
};

exports.createTask = async (req, res) => 
{
  try{
    const task = await Task.create(
      {
          title: req.body.title,
          description: req.body.description,
          dueDate: req.body.dueDate,
      }
    );
    //we can also use save method
    // await task.create();
    res.json(task);
  }catch(err)
  {
    res.send(err.message);
  }
};

exports.getTaskById = async (req, res) => {
  try{
    const task = await Task.findById(req.params.id);
    res.json(task);
  }catch(err){
    res.send(err.message);
  }
};

exports.updateTask = async (req, res) => {
  try{
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  }catch(err)
  {
    res.send(err.message);
  }
};

exports.deleteTask= async (req, res) => {
    try{
      const task = await Task.findByIdAndDelete(req.params.id);
      res.json(task);
    }catch(err)
    {
      res.send(err.message);
    }
  };
  