const Job = require('../models/Job');

module.exports = async (req, res) => {
  try {
    const query = req.query.q;
    const jobs = await Job.searchJobs(query);
    res.render('search', {
      user: req.user,
      jobs: jobs,
    })
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}