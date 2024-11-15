const pitch = document.querySelector('#pitch');
const salary = document.querySelector('#salary');
const applyBtn = document.querySelector('button');
const jobId = window.location.pathname.split('/').pop(); // extracts the last part of the URL path, which is the jobId

applyBtn.addEventListener('click', async () => {
  const pitchValue = pitch.value;
  const salaryValue = salary.value;
  
  if (pitchValue && salaryValue) {
    try {
      const response = await fetch(`/apply-job/${jobId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pitch: pitchValue,
          salary: salaryValue
        }),
      });

      if (response.ok) {
        const alert = document.createElement('p');
        alert.textContent = 'Application submitted successfully!';
        alert.classList.add('alert');

        const applyContainer = document.querySelector('.apply');
        applyContainer.appendChild(alert);

        setTimeout(() => {
          alert.remove();
        }, 3000);
      } else {
        console.log('Application submission failed');
      }
    } catch (err) {
      console.error(err);
    }
  }
})