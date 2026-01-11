const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token not found, please log in." });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token is invalid or expired." });
    }
}

module.exports = authMiddleware;