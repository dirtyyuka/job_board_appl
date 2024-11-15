const Application = require('../models/Application');

module.exports = async (req, res) => {
  try {
    const id = req.params.jobId;
    const { pitch, salary } = req.body;
    const userId = req.user.id;

    await Application.createTable();
    await Application.insertApplication(id, userId, pitch, salary);
    
    res.status(200).json({ status: 'success', message: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ status: 'error', error: 'Internal Server Error', message: err.message });
  }
}