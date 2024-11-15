const Application = require('../models/Application');

module.exports = async (req, res) => {
  try {
    await Application.createTable();
    const jobId = req.params.jobId;
    const applications = await Application.getApplications(jobId);
    console.log(applications);
    res.render('jobDetails', {
      user: req.user,
      applications
    });
  } catch (err) {
    res.status(500).json({ status: 'error', error: 'Internal Server Error', message: err.message });
  }
}