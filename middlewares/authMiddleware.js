const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from 'Authorization' header
  const authHeader = req.header('Authorization');

  // Check if authHeader exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Extract token from 'Bearer <token>'
  const token = authHeader.split(' ')[1];

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
