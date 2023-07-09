// auth.js

const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const axios = require('axios');

async function fetchPublicKey() {
  try {
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/certs');
    const { keys } = response.data;
    
    // Find the key with the desired algorithm (e.g., RS256)
    const publicKey = keys.find(key => key.alg === 'RS256');
    
    if (publicKey) {
      const { n, e } = publicKey;
      const publicKeyValue = `-----BEGIN PUBLIC KEY-----\n${n}\n-----END PUBLIC KEY-----`;
      return publicKeyValue;
    } else {
      throw new Error('Public key not found');
    }
  } catch (error) {
    console.error('Error fetching public key:', error.message);
    throw error;
  }
}

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
    let user = await User.findOne({ email }).maxTimeMS(1000000).exec();

    // If the user doesn't exist, create a new user
    if (!user) {
      const newUser = new User({
        name,
        email,
        avatar: picture,
      });

      user = await newUser.save();
    }

    res.json({ email, name, picture }); // Send response data
  } catch (error) {
    console.error('Error signing in with Google:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.isAuthenticatedUser = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const publicKey = await fetchPublicKey();

  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    console.log(decoded);
    req.user = decoded;
    next(); // Proceed to the secured route handler
  } catch (error) {
    return res.status(403).json({ error: `Invalid token ${error}` });
  }
}