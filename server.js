require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const csv = require("fast-csv");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "rohitsinghalheroh";
const CSV_FILE = "./users.csv";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 🔹 Ensure CSV file exists with headers
if (!fs.existsSync(CSV_FILE)) {
  fs.writeFileSync(CSV_FILE, "profileFor,firstName,middleName,lastName,community,religion,email,password,dobDay,dobMonth,dobYear,country\n");
}

// 🔹 Helper function to read CSV
const readCSV = () => {
  return new Promise((resolve, reject) => {
    const users = [];
    fs.createReadStream(CSV_FILE)
      .pipe(csv.parse({ headers: true }))
      .on("data", (row) => users.push(row))
      .on("end", () => resolve(users))
      .on("error", (error) => reject(error));
  });
};

// 🔹 Middleware to Verify JWT Token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

// 🔹 Signup Route (Store User Data in CSV)
app.post("/api/signup", async (req, res) => {
  try {
    const { profileFor, firstName, middleName, lastName, community, religion, email, password, dobDay, dobMonth, dobYear, country } = req.body;

    // Read existing users
    const users = await readCSV();
    if (users.some((user) => user.email === email)) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Append new user to CSV
    const newUser = `${profileFor},${firstName},${middleName},${lastName},${community},${religion},${email},${hashedPassword},${dobDay},${dobMonth},${dobYear},${country}\n`;
    fs.appendFileSync(CSV_FILE, newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Login Route (Validate Credentials from CSV)
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await readCSV();
    
    // Find user by email
    const user = users.find((user) => user.email === email);
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    // Generate JWT Token
    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Protected Profile Route (Requires JWT)
app.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const users = await readCSV();
    const user = users.find((user) => user.email === req.user.email);
    
    if (!user) return res.status(404).json({ error: "User not found" });

    // Remove password before sending response
    delete user.password;
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
