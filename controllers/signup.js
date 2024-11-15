const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../services/authentication');

module.exports = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    await User.createTable();

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.insertUser(username, email, hashedPassword, role);

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
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}