const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const authMiddleware = (req) => {
  // Get the token from the headers
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1]; // Bearer <token>

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to the request
      req.user = decoded;
    } catch (err) {
      throw new AuthenticationError('Invalid/Expired token');
    }
  }

  return req; // Return the request object so it can be used in the context
};

module.exports = { authMiddleware };
