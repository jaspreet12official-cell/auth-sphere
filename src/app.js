import express from "express";
import authRoutes from "./routes/AuthRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Secure User API is running 🚀"
  });
});

export default app;