const email = document.getElementById('email');
const password = document.getElementById('password');
const button = document.getElementById('signin');

button.addEventListener('click', async () => {
  const emailValue = email.value;
  const passwordValue = password.value;

  try {
    const response = await fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue
      })
    });

    if (response.ok) {
      console.log('Sign in successful');
      window.location.href = '/';
    } else {
      console.log('Sign in failed');
    }
  } catch (err) {
    console.error(err);
  }
})