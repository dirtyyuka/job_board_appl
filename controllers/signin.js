const User = require('../models/User');
const { generateToken } = require('../services/authentication');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  try {
    await User.createTable();
    const user = await User.getUserByEmail(email);

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).send('Invalid credentials');
      return;
    }

    // Generate JWT token
    const token = generateToken(user);

    // Set the token as a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 10 * 60 * 1000 // 10 minutes
    });

    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
}