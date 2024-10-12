import express from 'express';
import cors from "cors";
import fileUpload from "express-fileupload";

import path from 'path';
import { fileURLToPath } from 'url'; 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));


app.use(express.static("public"));

app.use(fileUpload({
    useTempFiles: true
}));


app.use("/images", express.static(path.join(__dirname, "public/images")));



export { app };
