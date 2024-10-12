import { User } from '../models/UserModel.js';

// Fetch users from the database
const adminController = async (req, res) => {
  try {
    const users = await User.find({});
    
    // Check if users exist
    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }
    
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export default adminController;
