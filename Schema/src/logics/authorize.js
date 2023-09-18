const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded; // Attach user information to the request object
    next(); // User is authorized, proceed to the next middleware or route handler
  });
};

module.exports = authorize;