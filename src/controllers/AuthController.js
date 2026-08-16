import User from "../models/User.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check all fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
      console.log("all ")
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        
      });
       console.log("all exist")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
     console.log("new one created ")

  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
     console.log("false ")
  }
};

export const loginUser = async (req, res) => {
  try {
     const {email , password} = req.body;
//check all fields 
     if( !email || !password) {
      return res.status(400).json({
        message:"all fields are required"
      })
     }
 // find user by email 
 const user = await User.findOne({email});
 if (!user) {
  return res.status(400).json({
    success: false,
    message: "Invalid email or password"
  });
 }
 //when both are correct lets compare passwords

 const isPasswordCorrect = await bcrypt.compare(password , user.password);
 if (!isPasswordCorrect) {
  return res.status(400).json({
    success:false,
    message:'invalid email or password '
  })
 }

  return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  }
  catch (error ){
    console.error("login error" , error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });

  }
}

export const logoutUser = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};