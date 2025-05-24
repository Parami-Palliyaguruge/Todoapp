import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated: isAuth0Authenticated, isLoading } = useAuth0();
  const location = useLocation();

  // Check for test authentication
  const mockAuth = localStorage.getItem('mock_auth');
  const isTestAuthenticated = mockAuth ? JSON.parse(mockAuth).isAuthenticated : false;

  // Consider authenticated if either Auth0 or test auth is valid
  const isAuthenticated = isAuth0Authenticated || isTestAuthenticated;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 