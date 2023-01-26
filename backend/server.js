require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes.js');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());
app.use(cors());

// middleware to show path and method
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/books', bookRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('DB connected and listening on port ' + process.env.PORT);
        })
    })
    .catch(e => {
        console.log(e);
    })
