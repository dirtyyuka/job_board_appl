module.exports = async (req, res, next) => {
  if (req.user && req.user.role === 'job-seeker') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}