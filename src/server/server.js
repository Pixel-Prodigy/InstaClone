import cors from "cors";
import { signup } from "./auth/signup.js";
import { login } from "./auth/login.js";
import { authenticateUser } from "./auth/authenticationChecker.js";
import express from "express";
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.post("/signup", signup);

app.post("/login", login);
app.get("/me", authenticateUser);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
