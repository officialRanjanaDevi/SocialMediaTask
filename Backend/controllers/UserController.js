import { User } from '../models/UserModel.js';
import { validationResult } from 'express-validator';
import cloudinary from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Add user to the database
const userController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, socialMedia } = req.body;
  const files = req.files.images; 

   try {
    let images = [];

    //  upload each image to Cloudinary
    if (files && files.length > 0) {
      for (let file of files) {
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
          folder: 'user_uploads', 
          resource_type: 'auto' 
        });
        images.push(result.secure_url); 
      }
    }

    // Create a new user with the uploaded file URLs
    
    const user = await User.create({
      name,
      socialMedia,
      images, 
    });
    
    return res.status(200).json({ success: true, user });

  } catch (e) {
    console.error("Error:", e);
    return res.status(500).json({ message: "Server issue", error: e.message });
  }
};

export default userController;
