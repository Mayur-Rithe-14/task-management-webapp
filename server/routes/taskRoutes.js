import express from "express";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getStats,
} from "../controllers/taskController.js";

import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTasks);

router.post("/", protect, createTask);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

router.get("/stats", protect, getStats);

export default router;
