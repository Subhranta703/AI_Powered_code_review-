const express = require('express');
const aiRoutes = require('./routes/ai.routes');
// const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();
app.use(express.json());
aiRoutes.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/ai', aiRoutes);

module.exports = app;


