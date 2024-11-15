const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const signup = require('./controllers/signup');
const signin = require('./controllers/signin');
const createJob = require('./controllers/createJob');
const getJobApplications = require('./controllers/getJobApplications');
const authentication = require('./middlewares/authentication');
const ensureEmployer = require('./middlewares/ensureEmployer');
const ensureJobSeeker = require('./middlewares/ensureJobSeeker');
const searchJob = require('./controllers/searchJob');
const applyJob = require('./controllers/applyJob');

//routes
const employer = require('./routes/employer');

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(authentication);

//*set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//* static folder
app.use(express.static(path.join(__dirname, 'public')));

//*routes
app.get('/', (req, res) => {
  if (req.user) {
    res.render('home', {
      user: req.user,
    });
  } else {
    res.render('landing', {
      user: null,
    })
  }
})

app.get('/signup', (req, res) => {
  res.render('signup');
})

app.post('/signup', signup);

app.get('/signin', (req, res) => {
  res.render('signin');
})

app.post('/signin', signin);

app.get('/user', (req, res) => {
  res.render('user');
})

app.get('/create-job', ensureEmployer, (req, res) => {
  res.render('create-job', {
    user: req.user,
  });
})

app.post('/create-job', ensureEmployer, createJob);

app.use('/employer', employer);

app.get('/jobs/:jobId', getJobApplications);

app.get('/search-job', searchJob);

app.get('/apply/jobs/:jobId', ensureJobSeeker, (req, res) => {
  res.render('apply-job', {
    user: req.user,
    jobId: req.params.jobId
  })
});

app.post('/apply-job/:jobId', ensureJobSeeker, applyJob);

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
})

//* start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})