import express, { Request, Response } from "express";
import userRoutes from "./routes/user.routes.js";
import facultyRoutes from "./routes/faculty.routes.js";

const app = express();

app.use(express.json()); // Middleware to parse incoming requests with JSON payloads

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello World!");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/faculty", facultyRoutes);

export default app;
