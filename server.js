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
const CSV_FILE = './users.csv';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 🔹 Ensure CSV file exists with headers
const initCSV = () => {
  if (!fs.existsSync(CSV_FILE)) {
    const headers = ["profileFor", "firstName", "middleName", "lastName", "community", "religion", "email", "password", "dobDay", "dobMonth", "dobYear", "country"].join(',');
    fs.writeFileSync(CSV_FILE, headers + '\n');
  }
};
initCSV();

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

// 🔹 Helper function to write CSV (correctly escaping fields)
const appendUserToCSV = async (user) => {
  const csvStream = csv.format({ headers: false, quote: true });
  csvStream.pipe(fs.createWriteStream(CSV_FILE, { flags: 'a' }));
  csvStream.write(user);
  csvStream.end();
};

// 🔹 Middleware to Verify JWT Token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(' ')[1]; // Handle "Bearer TOKEN"
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

    const users = await readCSV();
    if (users.some((user) => user.email === email)) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Use csv.format to handle CSV escaping
    await appendUserToCSV({
      profileFor, firstName, middleName, lastName, 
      community, religion, email, password: hashedPassword, 
      dobDay, dobMonth, dobYear, country
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await readCSV();
    const user = users.find((u) => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Protected Profile Route
app.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const users = await readCSV();
    const user = users.find((u) => u.email === req.user.email);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { password, ...userData } = user; // Remove password
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
