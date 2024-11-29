import express from "express"
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import CookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js"
import cors from "cors"
import { app,  server } from "./config/socket.js";

dotenv.config()
app.use(express.json({ limit: '100mb' }));
app.use(CookieParser());
app.use(cors());

const PORT = process.env.PORT


app.use("/api/auth", authRoutes)
app.use("/api/message",messageRoutes)

app.get('/',(req,res) => {
    res.send("API WORKING")
})


server.listen(PORT, () => {
    console.log("Server is Running in Port: " + PORT)
    connectDB()
})