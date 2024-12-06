const express = require('express');
const router = express.Router();
const connectDB = require('../dbConnection');

// POST: Add data to the database
router.post('/', async (req, res) => {
    try {
        const { fname, lname } = req.body;

        if (!fname || !lname) {
            return res.status(400).json({ statusCode: 400, message: 'Both fname and lname are required.' });
        }

        const db = await connectDB();
        const collection = db.collection('detailCollection'); // Use your collection name
        const result = await collection.insertOne({ fname, lname });

        res.status(201).json({ statusCode: 201, message: 'Data added successfully', result });
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
});

// GET: Fetch all data from the database
router.get('/', async (req, res) => {
    try {
        const db = await connectDB();
        const collection = db.collection('detailCollection');
        const data = await collection.find({}).toArray();

        res.status(200).json({ statusCode: 200, data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
});

module.exports = router;
