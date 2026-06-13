import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import {updateProfile, changePassword} from "../controllers/userController.js";

const router = express.Router();

router.put("/profile", protect, updateProfile);
router.put("/password", protect, changePassword);

export default router;
