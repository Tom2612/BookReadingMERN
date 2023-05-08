require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const debug = require('debug')('http');
const bookRoutes = require('./routes/bookRoutes.js');
const userRoutes = require('./routes/user');

const app = express();

app.use(helmet({
    crossOriginEmbedderPolicy: false
}));
app.use(compression());

let limiter = RateLimit({
    windowsMs: 1 * 60 * 1000,
    max: 20
});
app.use(limiter);

app.use(express.json());
app.use(cors());

// middleware to show path and method
app.use((req, res, next) => {
    debug(req.path, req.method);
    next();
})

// routes
app.use('/api/books', bookRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            // console.log('DB Connected ', + process.env.PORT)
            debug('DB connected and listening on port ' + process.env.PORT);
            debug('listening');
        })
    })
    .catch(e => {
        // console.log('error: ', e)
        debug(e);
    })
