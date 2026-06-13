import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Update Profile

export const updateProfile = async (req, res) => {
  try {
    const {name, email} = req.body;

    const user = await User.findById(req.user.id);

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.json({
      success: true,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Change Password

export const changePassword = async (req, res) => {
  try {
    const {currentPassword, newPassword} = req.body;

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
