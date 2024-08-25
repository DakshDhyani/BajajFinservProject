const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());


app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: 'Invalid input format. Expected an array of strings.',
      });
    }

    
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
    
    const highestLowercase = lowercaseAlphabets.length > 0 
      ? [lowercaseAlphabets.sort().pop()] 
      : [];


    const userId = "john_doe_17091999";
    const email = "john@xyz.com";
    const rollNumber = "ABCD123";

    return res.json({
      is_success: true,
      user_id: userId,
      email: email,
      roll_number: rollNumber,
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercase
    });
  } catch (error) {
    return res.status(500).json({
      is_success: false,
      message: 'An error occurred while processing your request.'
    });
  }
});

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

// initialize
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
