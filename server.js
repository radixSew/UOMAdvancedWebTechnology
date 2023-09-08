const express = require("express");
const app = express();
const db = require("./database.js");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const HTTP_PORT = 8080;

app.listen(HTTP_PORT, () => {
    console.log(`Server is running on port ${HTTP_PORT}`);
});

// API endpoint for customer registration
app.post("/api/register-customer", (req, res) => {
    try {
        const {
            name,
            address,
            email,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
            timestamp
        } = req.body;

        // Perform validation (you can use a validation library or write custom validation functions)
        if (!emailIsValid(email)) {
            res.status(400).json({ "error": "Invalid email address" });
            return;
        }
        if (!creditCardIsValid(cardNumber)) {
            res.status(400).json({ "error": "Invalid credit card number" });
            return;
        }

        // Insert the customer data into the database
        const sql = `INSERT INTO customer (
            name, address, email, gender, age,
            cardHolderName, cardNumber, expiryDate, cvv, timestamp
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const params = [
            name, address, email, gender, age,
            cardHolderName, cardNumber, expiryDate, cvv, timestamp
        ];

        db.run(sql, params, function (err) {
            if (err) {
                res.status(400).json({ "error": err.message });
            } else {
                res.status(201).json({
                    "message": `Customer ${name} has registered`,
                    "customerId": this.lastID
                });
            }
        });
    } catch (e) {
        res.status(500).json({ "error": e.message });
    }
});

// Helper function for email validation (you can use a library like 'validator')
function emailIsValid(email) {
    // Implement email validation logic here
    return true; // Replace with your validation logic
}

// Helper function for credit card number validation
function creditCardIsValid(cardNumber) {
    // Implement credit card validation logic here
    return cardNumber.length === 12; // Replace with your validation logic
}
