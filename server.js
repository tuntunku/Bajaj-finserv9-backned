const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Hardcoded user details
const user_id = "john_doe_17091999";
const email = "john@xyz.com";
const roll_number = "ABCD123";

// POST endpoint
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Invalid input" });
    }

    // Separate numbers and alphabets
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /[a-zA-Z]/.test(item));

    // Find the highest alphabet (case insensitive)
    let highest_alphabet = [];
    if (alphabets.length > 0) {
      highest_alphabet = [alphabets.reduce((a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b))];
    }

    // Response
    res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_alphabet,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, error: "Internal server error" });
  }
});

// GET endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});