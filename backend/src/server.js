import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT  = process.env.PORT || 5000;



// middleware
app.use(express.json())
app.use(rateLimiter)
// custom middleware
// app.use((req, res, next) => {
//     console.log(`got new request : request method:${req.method}, request url: ${req.url}`)
//     next();
// })

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
   app.listen(PORT, () => {
    console.log("sever starting on port", PORT)
  })
}).catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1); 
  });



