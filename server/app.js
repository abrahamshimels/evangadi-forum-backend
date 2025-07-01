require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5500;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database connection
const dbCon = require("./db/dbConfig");

// Auth middleware
const authMiddleware = require("./middleware/authMiddleware");

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const questionRoutes = require("./routes/questionRoutes");
app.use("/api/questions", authMiddleware, questionRoutes);

const answerRoutes = require("./routes/answerRoutes");
app.use("/api/answers", authMiddleware, answerRoutes);

// Default route
app.get("/", (req, res) => {
  console.log("request received at root endpoint");
  res.send("Welcome to the Evangadi Forum API");
});

// Start server
async function start() {
  try {
    await dbCon.execute("SELECT 'test'");
    console.log("✅ Database connection successful");

    const createTable = require("./migrate/createTable");
    await createTable();

    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Startup failed:", error.message);
    process.exit(1);
  }
}

start();

