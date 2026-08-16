import User from "../models/User.js";

export const getMyProfile = async (req, res) => {
    try{
      const user = await User.findById(req.user._id).select("-password");
      
    }
    catch(error){

    }
}