const Task = require('../models/task');

const getAllTasksForUser = async (req, res) => {
  try {
    const userId = req.user.id; 
    const tasks = await Task.findAll({ where: { userId } });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createTaskForUser = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { title, description, dueDate } = req.body;

    const newTask = await Task.create({
      title,
      description,
      dueDate,
      userId,
    });

    return res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const toggleTaskStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    
    const task = await Task.findOne({ where: { id: taskId, userId } });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.status = task.status === 'Completed' ? 'Not Completed' : 'Completed';
    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    console.error('Error toggling task status:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const editTaskForUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    
    const task = await Task.findOne({ where: { id: taskId, userId } });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update task information based on request body
    const { title, description, dueDate } = req.body;
    console.log(title, description, dueDate);
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;

    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    console.error('Error editing task:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getAllTasksForUser,
  createTaskForUser,
  toggleTaskStatus,
  editTaskForUser
};
