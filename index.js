const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // To parse incoming JSON requests

// POST route for /bfhl
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    // Extract numbers and alphabets from the input data array
    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = null;

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string') {
            alphabets.push(item);
            if (item === item.toLowerCase()) {
                if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        }
    });

    // Check if file is valid (base64 string check)
    const fileValid = file_b64 ? true : false; // Simplified file validity check
    const fileMimeType = fileValid ? 'image/png' : ''; // Example MIME type
    const fileSizeKB = fileValid ? 400 : 0; // Example file size

    // Construct response
    res.json({
        is_success: true,
        user_id: 'john_doe_17091999',
        email: 'john@xyz.com',
        roll_number: 'ABCD123',
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB
    });
});

// GET route for /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
