import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { TodoDashboard } from './components/TodoDashboard';
import { Login } from './components/Login';
import { Callback } from './components/Callback';
import { PrivateRoute } from './components/PrivateRoute';
import { auth0Config } from './auth/auth0-config';

function App() {
  return (
    <Auth0Provider
      domain={auth0Config.domain.trim()}
      clientId={auth0Config.clientId.trim()}
      authorizationParams={{
        redirect_uri: auth0Config.redirectUri,
        scope: auth0Config.scope,
        audience: auth0Config.audience.trim()
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <TodoDashboard />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </Provider>
    </Auth0Provider>
  );
}

export default App;
