import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

const users = [];
const JWT_SECRET = "secretkey"; 

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("Username and password required");
    }

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ username, password: hashedPassword });

    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(400).send("Cannot find user");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send("Invalid credentials");
    }

    const accessToken = jwt.sign(
      { username: user.username },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
    });

    res.json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send("Error logging in");
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.send("Logged out successfully");
});

app.get("/profile", (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {

    const verified = jwt.verify(token, JWT_SECRET);

    res.json({
      message: "Profile accessed successfully",
      user: verified,
    });
  } catch (error) {
    res.status(403).send("Invalid or expired token");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
