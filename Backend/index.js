import dotenv from "dotenv";
import cors from "cors";  // Missing import
import { app } from "./app.js";
import userRoutes from './routes/UserRoutes.js';
import adminRoutes from './routes/AdminRoutes.js';
import connectDB from "./db/index.js";

// Load environment variables from .env file
dotenv.config({ path: "./env" });

// Setup CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// Define routes
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// Set the port (default 3000)
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB()
  .then(() => {
    // Listen for any app errors
    app.on("error", (error) => {
      console.error("Server error: ", error);
      throw error;
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed: ", err);
  });
