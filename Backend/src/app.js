const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');

const app = express();

// ✅ CORS should be before routes
app.use(cors({
    origin: 'http://localhost:3001', // frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/ai', aiRoutes);

module.exports = app;
