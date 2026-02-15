import express from "express";
import cors from "cors";
import path from "path";
import userRouter from "./routes/userRoutes";
import bookRouter from "./routes/bookRoutes";

// import routes


const app = express();
app.use(cors());
app.use(express.json({strict: false}));

// mount routes
app.use("/user", userRouter);
app.use("/books", bookRouter);

app.get("/ping", (_, res) => res.send("pong"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
