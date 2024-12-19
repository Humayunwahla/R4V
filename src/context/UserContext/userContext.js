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

    initializeMsal();
  }, []);

  const requestAccessToken = () => {
    msalInstance.acquireTokenSilent({
      ...tokenRequest,
      account: msalInstance.getAllAccounts()[0]
    })
      .then(tokenResponse => {
        setAccessToken(tokenResponse.idToken);
        setUser(msalInstance.getAllAccounts()[0]);
      })
      .catch(error => {
        console.error("Token acquisition failed silently. Attempting popup", error);
        return msalInstance.acquireTokenPopup(tokenRequest)
          .then(tokenResponse => {
            setAccessToken(tokenResponse.idToken);
            setUser(msalInstance.getAllAccounts()[0]);
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
  };

  return (
    <UserContext.Provider value={{ accessToken, isAuthenticated, user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};