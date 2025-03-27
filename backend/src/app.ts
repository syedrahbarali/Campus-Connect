import express, { Request, Response } from "express";
import userRoutes from "./routes/user.routes.js";
import facultyRoutes from "./routes/faculty.routes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.options("*", cors()); // Handle preflight requests
app.use(express.json()); // Middleware to parse incoming requests with JSON payloads

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello World!");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/faculty", facultyRoutes);

export default app;
