module.exports = async (req, res, next) => {
  if (req.user && req.user.role === 'employer') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}