const Job = require('../models/Job');

module.exports = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }

  const { title, location, description, salary, tags } = req.body;
  console.log(tags);
  await Job.createTable();
  
  try {
    await Job.insertJob(req.user.id, title, location, description, salary, tags);
    return res.status(200).json({ status: 'success', message: 'Job created successfully' });
  } catch (err) {
    res.status(500).json({ status: 'error', error: 'Internal Server Error', message: err.message });
  }
}