const express = require('express');
const router = express.Router();

//controllers,middlewares
const getEmployerJobs = require('../controllers/getEmployerJobs');
const ensureEmployer = require('../middlewares/ensureEmployer');

router.get('/jobs', ensureEmployer, getEmployerJobs);

module.exports = router;