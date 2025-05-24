import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Callback = () => {
  const { isAuthenticated, isLoading, error, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      if (isAuthenticated && !isLoading) {
        try {
          const token = await getAccessTokenSilently();
          localStorage.setItem('auth0_token', token);
          navigate('/dashboard', { replace: true });
        } catch (err) {
          console.error('Error during callback:', err);
          navigate('/login', { replace: true });
        }
      }
    };

    handleCallback();
  }, [isAuthenticated, isLoading, getAccessTokenSilently, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Completing login...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Authentication Error: {error.message}</div>
      </div>
    );
  }

  return null;
}; 