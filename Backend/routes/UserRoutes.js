import express from "express";
import userController from "../controllers/UserController.js";
import { check, validationResult } from "express-validator";

const router = express.Router();



// Middleware to validate form data
const validateForm = [
  check("name", "Name is required").notEmpty(),
  check("socialMedia", "Social media handle is required").notEmpty(),
];

// POST request for form submission with file upload
router.post(
  "/", async(req, res, next) => {
       const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("hello");
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },

userController
);

export default router;
