import express from "express";
import complaintRoutes from "./routes/complaint.routes.js";
import loggerMiddleware from "./middleware/logger.middleware.js";

const app = express();

// View Engine Setup
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// Static Files
app.use(express.static("public"));

// API Routes
app.use("/api/complaints", complaintRoutes);

// Frontend Pages
app.get("/", (req, res) => res.render("index"));
app.get("/admin", (req, res) => res.render("admin"));
app.get("/complaints", (req, res) => res.render("complaints"));

export default app;
