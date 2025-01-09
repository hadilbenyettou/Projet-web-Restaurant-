const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.header('Authorization');
  console.log('Authorization header:', authorizationHeader);

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = authorizationHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token is missing in Authorization header' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
