// auth.js

const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const client = new OAuth2Client('53216454829-hvqli6c62q35rf63u5bt05b6t6snpald.apps.googleusercontent.com');

exports.verifyToken = async (req, res) => {
  try {
    const { tokenId } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: '53216454829-hvqli6c62q35rf63u5bt05b6t6snpald.apps.googleusercontent.com',
    });

    const { email, name, picture } = ticket.getPayload();

    // Check if the user already exists in the database
    let user = await User.findOne({ email }).exec();

    // If the user doesn't exist, create a new user
    if (!user) {
      const newUser = new User({
        name,
        email,
        avatar: picture,
      });

      user = await newUser.save();
    }
    const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '30d' });
    res.json({ token, email, name, picture }); // Send response data
  } catch (error) {
    console.error('Error signing in with Google:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.isAuthenticatedUser = async (req, res, next) => {
  const { authorization } = req.headers;

  console.log(authorization);

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  const token = authorization.split(' ')[1];
  console.log(token)

  try {
    const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');
    console.log(decoded);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    req.user = user;
    next();
  } catch (error) {
    console.error('Error verifying JWT token:', error.message);
    return res.status(403).json({ error: `Invalid token ${error}` });
  }
}