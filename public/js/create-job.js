// Fetch job data submission
const submitBtn = document.querySelector('.submit');

// Ensure tags are populated and accurate before form submission
submitBtn.addEventListener('click', () => {
  if (tags.length > 0) {
    const title = document.getElementById('title').value.trim();
    const locationValue = document.getElementById('location').value.trim();
    const description = document.getElementById('description').value.trim();
    const salary = document.getElementById('salary').value.trim();
  
    fetch('/create-job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        location: locationValue,
        description,
        salary,
        tags,  // Ensure tags are ready before submit
      })
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to submit job');
        return response.json();
      })
      .then((data) => console.log('Server response:', data))
      .catch((err) => console.log('Error:', err));
  }
});

// Handle keywords and tags
const keywordsInput = document.getElementById("keywords-input");
const tagsInputContainer = document.getElementById("tags-input-container");
const tags = [];

function createTag(label) {
  const tag = document.createElement("span");
  tag.classList.add("tag");
  tag.innerHTML = `<span>${label}</span><span class="remove-tag">&times;</span>`;

  // Add remove functionality to each tag
  tag.querySelector(".remove-tag").addEventListener("click", () => {
    tagsInputContainer.removeChild(tag);
    tags.splice(tags.indexOf(label), 1);
    removeAlertIfNecessary();

    // Debug: Log tags after removal
    console.log('Tags after removal:', tags);
  });

  return tag;
}

function addTag(label) {
  if (label && !tags.includes(label)) {  // Avoid empty or duplicate tags
    tags.push(label);
    const tag = createTag(label);
    tagsInputContainer.insertBefore(tag, keywordsInput);  // Insert before the input
    keywordsInput.value = "";  // Clear the input field
    
    // Debug: Log tags after adding
    console.log('Tags after addition:', tags);
  }
}

function removeAlertIfNecessary() {
  const alert = document.querySelector('.alert');
  if (alert && tags.length < 5) {
    alert.parentNode.removeChild(alert);
  }
}

keywordsInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();  // Prevent form submission
    const tag = keywordsInput.value.trim();
    if (tags.length < 5) {
      addTag(tag);
      if (tags.length === 5) {
        const alert = document.createElement('p');
        alert.textContent = 'Keyword limit reached!';
        alert.classList.add('alert');
        
        const keywordContainer = document.querySelector('.keyword-container');
        keywordContainer.appendChild(alert);
      }
    }
  }
});
