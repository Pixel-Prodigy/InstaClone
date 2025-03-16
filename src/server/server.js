import cors from "cors";
import { signup } from "./auth/signup.js";
import { login } from "./auth/login.js";
import { newPost } from "./posts/newPost.js";
import { authenticateUser } from "./auth/authenticationChecker.js";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const PORT = serverUrl.split(":")[2];
app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
console.log()

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.post("/signup", signup);

app.post("/login", login);
app.get("/me", authenticateUser);
app.post("/newPost", newPost);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
