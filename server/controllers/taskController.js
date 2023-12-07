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

module.exports = {
  getAllTasksForUser,
  createTaskForUser,
};
