const postedJobs = document.querySelector('.posted-jobs');
const appliedJobs = document.querySelector('.applied-jobs');
const searchJobs = document.querySelector('#searchJobs');

function renderJobCard(job) {
  const jobCard = document.createElement('div');
  jobCard.classList.add('job-card');
  jobCard.innerHTML = `
    <h3>${job.title}</h3>
    <p>${job.description}</p>
    <div class="labels">
      <p><span class="fas fa-map-marker-alt"></span> ${job.location}</p>
      <p><span class="fas fa-dollar-sign"></span> ${job.salary}</p>
    </div>
  `;
  jobCard.addEventListener('click', () => {
    window.location.href = `/jobs/${job.id}`
  })
  return jobCard;
}

if (postedJobs) {
  fetch('/employer/jobs', {
    method: 'GET', 
  })
    .then(response => response.json())
    .then(jobs => {
      jobs.forEach((job) => {
        postedJobs.appendChild(renderJobCard(job));
      })
    })
    .catch(error => console.error(error));
}

if (appliedJobs) {
  fetch('/job-seeker/jobs', {
    method: 'GET', 
  })
    .then(response => response.json())
    .then(jobs => {
      jobs.forEach((job) => {
        appliedJobs.appendChild(renderJobCard(job));
      })
    })
    .catch(error => console.error(error));
}

//search jobs
if (searchJobs) {
  searchJobs.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (searchJobs.value) {
        window.location.href = `/search-job?q=${searchJobs.value}`
      }
    }
  })
}