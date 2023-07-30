import React from 'react';
import { useContext } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import AuthContext from '../services/AuthContext';

const SignInButton = () => {
  const { login } = useContext(AuthContext);
  
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const tokenId = credentialResponse.credential;
    const decodedToken = jwt_decode(tokenId);
    const { email, name, picture } = decodedToken;
    console.log('Login Success', email, name, picture, tokenId);

    try {
        const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, picture, tokenId }),
        });

        if (response.ok) {
          const responseData = await response.json();
          login(responseData.token);
          console.log('Sign in successful!', email, name, picture, responseData);
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
