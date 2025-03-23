import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { CredentialResponse } from '@react-oauth/google';
import Cookies from 'js-cookie';

const CLIENT_ID = '251379498550-pikiuqu5h6blo8h37bu6o00j95iri5pn.apps.googleusercontent.com';

interface GoogleLoginButtonProps {
  onSuccess: () => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const handleSuccess = (response: CredentialResponse) => {
    console.log('Login Success:', response);
    const userId = response.credential;
    if (userId) {
      Cookies.set('userId', userId, { secure: true, sameSite: 'strict' }); // Remove httpOnly flag
      console.log('Cookie set:', Cookies.get('userId')); // Add this line to log the cookie value
    } else {
      console.error('User ID is undefined');
    }
    login(); // Set the user as authenticated
    onSuccess(); // Call the onSuccess prop
  };

  const handleFailure = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;