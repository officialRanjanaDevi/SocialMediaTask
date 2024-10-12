import express from 'express';
import adminController from '../controllers/AdminController.js';


const router = express.Router();

router.route("/")
  .get(adminController); 
export default router;
