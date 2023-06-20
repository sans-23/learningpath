const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('53216454829-hvqli6c62q35rf63u5bt05b6t6snpald.apps.googleusercontent.com');

async function verifyToken(req, res) {
  try {
    const { tokenId } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: '53216454829-hvqli6c62q35rf63u5bt05b6t6snpald.apps.googleusercontent.com',
    });

    const { email, name, picture } = ticket.getPayload();

    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    const { iat, exp, nbf } = ticket.payload;

    if (currentTime < nbf) {
      res.status(400).json({ error: 'Token used too early' });
      return;
    }

    if (currentTime > exp) {
      res.status(400).json({ error: 'Token has expired' });
      return;
    }

    res.json({ email, name, picture }); // Send response data
  } catch (error) {
    console.error('Error signing in with Google:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = verifyToken ;
