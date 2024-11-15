const Job = require('../models/Job');

module.exports = async (req, res) => {
  try {
    const jobs = await Job.getJobs(req.user.id);
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ status: 'error', error: 'Internal Server Error', message: err.message });
  }
}