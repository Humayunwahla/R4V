import React, { useState, useEffect } from 'react';
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest, tokenRequest } from './utils/authConfig';
import axios from 'axios';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Landingpage from './components/Landingpage';
import Patient from './pages/patient/Patient';
import StudyDetails from './pages/studyDetails/StudyDetails';
import CriticalFinding from './pages/criticalFinding/CriticalFinding';
import WetReads from './pages/wetReads/WetReads';
import AttachedDocument from './pages/attachedDocument/AttachedDocument';
import Layout from './Layout';
import Header from '../src/components/Header'

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiData, setApiData] = useState(null);

  // Initialize the MSAL instance
  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await msalInstance.initialize();
        msalInstance.handleRedirectPromise()
          .then(response => {
            if (response) {
              setIsAuthenticated(true);
              requestAccessToken();
            } else {
              const accounts = msalInstance.getAllAccounts();
              if (accounts.length > 0) {
                requestAccessToken();
              }
            }
          })
          .catch(error => {
            console.error("Login redirect error", error);
          });
      } catch (error) {
        console.error("MSAL initialization failed", error);
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
        console.log("Token response from acquireTokenSilent:", tokenResponse);
        setAccessToken(tokenResponse.idToken);
      })
      .catch(error => {
        console.error("Token acquisition failed silently. Attempting popup", error);
        return msalInstance.acquireTokenPopup(tokenRequest)
          .then(tokenResponse => {
            console.log("Token response from acquireTokenPopup:", tokenResponse);
            setAccessToken(tokenResponse.idToken);
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
    setApiData(null);
  };

  // Function to get data from the API
  const getDataFromApi = () => {
    let data = JSON.stringify({
      "catalogType": 3
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://devvetsapimanagement.azure-api.net/ReportingMicroservice/api/Catalog/GetCatalog',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log("API response:", response.data);
        setApiData(JSON.stringify(response.data, null, 2)); // Format JSON for display
      })
      .catch((error) => {
        console.error("API request error", error);
        setApiData("Error: " + error.message);
      });
  };

  return (
    <div className='p-3'>
      {isAuthenticated ? (
        <>
        <Header />
        <Router>
          <Routes>
            <Route path='/' element={<Landingpage />} />
            <Route path="/" element={<Layout />}>
              <Route path='/patient' element={<Patient />} />
              <Route path="/studydetails" element={<StudyDetails />} />
              <Route path="/criticalfindings" element={<CriticalFinding />} />
              <Route path="/wetreads" element={<WetReads />} />
              <Route path="/attacheddocument" element={<AttachedDocument />} />
            </Route>
          </Routes>
        </Router>
        </>
      ) : (
        <button onClick={handleLogin}>Login with Microsoft</button>
      )}
    </div>
  );
}

export default App;
