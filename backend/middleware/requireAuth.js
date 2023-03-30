const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const debug = require('debug')('auth');

const requireAuth = async (req, res, next) => {

    // verify user authenticated
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'});
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);

        // create user property in req and give it id property
        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        debug(error);
        res.status(401).json({error: 'Request is not authorized'});
    }
}

module.exports = requireAuth;