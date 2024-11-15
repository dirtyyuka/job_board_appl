const { validateToken } = require('../services/authentication');

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const user = await validateToken(token);
      req.user = user;
    } catch (err) {
      console.error(err);
    }
  }
  next();
}