import React, { createContext, useState, useEffect } from 'react';
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest, tokenRequest } from '../../utils/authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage for existing user session
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedAccessToken = localStorage.getItem('accessToken');

    if (storedUser && storedAccessToken) {
      setUser(storedUser);
      setAccessToken(storedAccessToken);
      setIsAuthenticated(true);
    } else {
      initializeMsal();
    }
  }, []);

  const initializeMsal = async () => {
    try {
      await msalInstance.initialize(); // Ensure MSAL is initialized
      const response = await msalInstance.handleRedirectPromise();
      if (response) {
        setIsAuthenticated(true);
        requestAccessToken();
      } else {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          requestAccessToken();
        }
      }
    } catch (error) {
      console.error("MSAL initialization or redirection handling failed", error);
    }
  };

  const requestAccessToken = () => {
    msalInstance.acquireTokenSilent({
      ...tokenRequest,
      account: msalInstance.getAllAccounts()[0]
    })
      .then(tokenResponse => {
        const token = tokenResponse.idToken;
        const currentUser = msalInstance.getAllAccounts()[0];
        setAccessToken(token);
        setUser(currentUser);
        setIsAuthenticated(true);

        // Store token and user in localStorage
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify(currentUser));
      })
      .catch(error => {
        console.error("Token acquisition failed silently. Attempting popup", error);
        return msalInstance.acquireTokenPopup(tokenRequest)
          .then(tokenResponse => {
            const token = tokenResponse.idToken;
            const currentUser = msalInstance.getAllAccounts()[0];
            setAccessToken(token);
            setUser(currentUser);
            setIsAuthenticated(true);

            // Store token and user in localStorage
            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(currentUser));
          })
          .catch(error => console.error("Popup token acquisition failed", error));
      });
  };

  const handleLogin = () => {
    msalInstance.loginRedirect(loginRequest);
  };

  const handleLogout = () => {
    msalInstance.logoutRedirect();
    setIsAuthenticated(false);
    setAccessToken(null);
    setUser(null);

    // Clear localStorage on logout
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ accessToken, isAuthenticated, user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
