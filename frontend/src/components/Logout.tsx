import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const { logout: auth0Logout } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear test authentication if it exists
    localStorage.removeItem('mock_auth');
    
    // Logout from Auth0
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin + '/login'
      }
    });

    // Navigate to login page
    navigate('/login', { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Logout
    </button>
  );
}; 