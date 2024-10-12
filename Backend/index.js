import dotenv from "dotenv";
import cors from "cors";  
import { app } from "./app.js";
import userRoutes from './routes/UserRoutes.js';
import adminRoutes from './routes/AdminRoutes.js';
import connectDB from "./db/index.js";

dotenv.config({ path: "./env" });


app.use(cors({
  origin: process.env.CORS_ORIGIN,
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
