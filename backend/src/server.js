import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from 'path'

dotenv.config();

const app = express();
const PORT  = process.env.PORT || 5000;
const __dirname = path.resolve();


// middleware
if(process.env.NODE_ENV !== "production") {
  app.use(cors({
  origin: "http://localhost:5173",
}))
}

app.use(express.json())
app.use(rateLimiter)

// custom middleware
// app.use((req, res, next) => {
//     console.log(`got new request : request method:${req.method}, request url: ${req.url}`)
//     next();
// })


app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client","dist", "index.html"))
  })
}

connectDB().then(() => {
   app.listen(PORT, () => {
    console.log("sever starting on port", PORT)
  })
}).catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1); 
  });



