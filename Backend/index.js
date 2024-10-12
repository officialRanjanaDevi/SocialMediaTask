import dotenv from "dotenv";
import cors from "cors";  
import { app } from "./app.js";
import userRoutes from './routes/UserRoutes.js';
import adminRoutes from './routes/AdminRoutes.js';
import connectDB from "./db/index.js";

dotenv.config({ path: "./env" });

// Define the allowed origins
 const allowedOrigins = ['https://social-media-task-theta.vercel.app', 'https://social-media-task-burz56elg-ranjanas-projects-e143689b.vercel.app', '*'];

app.use(cors({
  origin:allowedOrigins,
  credentials: true
}));


app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

const port = process.env.PORT || 3000;


connectDB()
  .then(() => {
   
    app.on("error", (error) => {
      console.error("Server error: ", error);
      throw error;
    });

    //  server is starting
    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed: ", err);
  });
