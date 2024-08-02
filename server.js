const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Your user details - replace these with your actual details
const USER_ID = "AshrayaAgnihotri";
const EMAIL = "aa2368@srmist.edu.in";
const ROLL_NUMBER = "RA2111033010149";

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      throw new Error('Invalid input: data must be an array');
    }

    const numbers = data.filter(item => !isNaN(item) && item !== '');
    const alphabets = data.filter(item => isNaN(item) && item.length === 1 && item !== '');
    const highest_alphabet = alphabets.length > 0 
      ? [alphabets.reduce((a, b) => a.toLowerCase() >= b.toLowerCase() ? a : b)]
      : [];

    res.json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highest_alphabet
    });
  } catch (error) {
    res.status(400).json({
      is_success: false,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers: [],
      alphabets: [],
      highest_alphabet: []
    });
  }
});

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
