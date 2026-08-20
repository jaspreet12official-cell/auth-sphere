import User from "../models/User.js";

export const getAllUsers = async (req , res) => {
    try{
const users = await User.find().select("-password");
   res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
    }
    catch(error){
 res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
    }
}

export const getUserById = async (req , res) => {
    try{
const user = await User.findById(req.params.id).select("-password");
if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
    }
    catch(error){
        res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
    }
}
export const updateUser = async (req , res) => {
    try{
const {name , email , role } = req.body;
 const user = await User.findById(req.params.id);
  if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
    }
    catch(error){
         res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
        
    }
}
export const deleteUser = async (req , res) => {
     try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};