import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user._id,
  });

  res.json(tasks);
};

export const createTask = async (req, res) => {
  const {title, description, status, dueDate} = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    dueDate,
    user: req.user._id,
  });

  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({message: "Task not found"});
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedTask);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  res.json({
    message: "Task deleted",
  });
};

export const getStats = async (req, res) => {
  const tasks = await Task.find({
    user: req.user._id,
  });

  res.json({
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "Pending").length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    completed: tasks.filter((t) => t.status === "Completed").length,
  });
};
