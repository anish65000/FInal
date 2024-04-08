// Updated authenticateToken middleware
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const authenticateToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Token missing or invalid format' });
    }

    const token = authorizationHeader.split(' ')[1];

    // Load secret key from environment variable
    const secretKey = process.env.JWT_SECRET;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('JWT Verification Error:', err.message);
            if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            } else if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Unauthorized: Token expired' });
            } else {
                return res.status(403).json({ message: 'Forbidden' });
            }
        }

        // Ensure userId is present in the decoded token
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Unauthorized: Missing user ID in token" });
        }

        req.user = decoded;
        next();
    });
}

module.exports = authenticateToken;
