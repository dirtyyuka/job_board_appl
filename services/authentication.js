const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10min'
  })
}

const validateToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = { generateToken, validateToken };