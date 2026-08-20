import express from "express";
import {
  getProfile,
  updateProfile,
  deleteAccount, changePassword 
} from "../controllers/UserController.js";

import isAuthenticated from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/profile", isAuthenticated, getProfile);

router.put("/profile", isAuthenticated, updateProfile);
router.put("/change-password" , isAuthenticated , changePassword);
router.delete("/profile", isAuthenticated, deleteAccount);

export default router;