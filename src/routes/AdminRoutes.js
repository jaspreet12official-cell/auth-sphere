import express from "express";
import  isAuthenticated  from "../middleware/AuthMiddleware.js";
import { authorizeRoles } from "../middleware/RoleMiddleware.js";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/AdminController.js";
const router = express.Router();

router.get(
  "/dashboard",
  isAuthenticated,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to Admin Dashboard",
    });
  }
);

router.put(
  "/users/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUser
);

router.delete(
  "/users/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);
router.get(
  "/users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

router.get(
  "/users/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  getUserById
);

export default router;