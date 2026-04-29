import dotenv from "dotenv";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";
import blogRouter from "./routes/blog.route";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);

app.get("/health", (req: Request, res: Response) => {
  res.send("Backend is working");
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const message = err instanceof Error ? err.message : "An unknown error occurred";
  
  res.status(500).json({
    success: false,
    message: message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is listening to post ${PORT}`);
});
