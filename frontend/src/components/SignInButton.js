import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const SignInButton = () => {
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const tokenId = credentialResponse.credential;
    const decodedToken = jwt_decode(tokenId);
    const { email, name, picture } = decodedToken;

    try {
        const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, picture, tokenId }),
        });

        if (response.ok) {
          console.log('User created successfully');
        } else {
          console.error('Error creating user:', response.statusText);
        }
    } catch (error) {
        console.error('Error creating user:', error);
    }
  };

  const handleGoogleLoginError = () => {
    console.log('Login Failed');
    // Handle error cases
  };

  return (
    
      <div>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
        />
      </div>
  );
};

export default SignInButton;
