// auth.js

const { OAuth2Client } = require('google-auth-library');
const User = require('../models/userModel');

const client = new OAuth2Client('53216454829-hvqli6c62q35rf63u5bt05b6t6snpald.apps.googleusercontent.com');

async function verifyToken(req, res) {
  try {
    const { tokenId } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: '53216454829-hvqli6c62q35rf63u5bt05b6t6snpald.apps.googleusercontent.com',
    });

    const { email, name, picture } = ticket.getPayload();

    // const x = new User({name, email, avatar:picture});
    // let y = await x.save();

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

module.exports = verifyToken ;
