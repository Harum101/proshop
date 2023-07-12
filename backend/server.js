import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productsRoutes from "./routes/productsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Running on Port: ${PORT}`));