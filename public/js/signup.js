const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const role = document.getElementById('role');

const button = document.getElementById('signup');

button.addEventListener('click', async () => {
  const usernameValue = username.value;
  const emailValue = email.value;
  const passwordValue = password.value;
  const roleValue = role.value;

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
        role: roleValue
      })
    });

    if (response.ok) {
      console.log('Sign up successful');
      window.location.href = '/';
    } else {
      console.error('Sign up failed');
    }
  } catch (error) {
    console.error('Error signing up:', error);
  }
})