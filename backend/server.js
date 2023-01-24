require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
})

app.get('/', (req, res) => {
    res.json({mssg: 'getting'})
})

app.listen(4000, () => {
    console.log('listening on port 4000')
})