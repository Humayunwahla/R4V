import React, { useContext, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Use named import for jwtDecode
import Landingpage from './components/Landingpage';
import Patient from './pages/patient/Patient';
import StudyDetails from './pages/studyDetails/StudyDetails';
import CriticalFinding from './pages/criticalFinding/CriticalFinding';
import WetReads from './pages/wetReads/WetReads';
import AttachedDocument from './pages/attachedDocument/AttachedDocument';
import Layout from './Layout';
import Header from './components/Header';
import axios from 'axios';
import { UserContext } from './context/UserContext/userContext';
import Message from './components/Message/Message';
import Test from './components/Test';
import Chat from './pages/chat/Chat';
function App() {
  const { accessToken, isAuthenticated, handleLogin, handleLogout } = useContext(UserContext);
  // Check token validity on app load
  useEffect(() => {
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decodedToken.exp < currentTime) {
          console.warn("Token expired. Logging out.");
          handleLogout(); // Logout if the token is expired
        }
      } catch (error) {
        console.error("Failed to decode token", error);
        handleLogout(); // Logout on token decode failure
      }
    }
  }, [accessToken, handleLogout]);
  const getDataFromApi = () => {
    if (!accessToken) {
      console.error("No access token available");
      return;
    }
    const data = JSON.stringify({
      catalogType: 3
    });
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://devvetsapimanagement.azure-api.net/ReportingMicroservice/api/Catalog/GetCatalog',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      },
      data: data
    };
    axios.request(config)
      .then((response) => {
        console.log("API response:", response.data);
      })
      .catch((error) => {
        console.error("API request error", error);
      });
  };
  return (
    <div className='p-3 overflow-hidden'>
      {isAuthenticated ? (
        <>
          <Header />
          <Router>
            <div className='fixed bottom-3 right-3'>
              <Message />
            </div>
            <Routes>
              <Route path='/' element={<Landingpage />} />
              <Route path="/" element={<Layout />}>
                <Route path='/patient' element={<Patient />} />
                <Route path="/studydetails" element={<StudyDetails />} />
                <Route path="/criticalfindings" element={<CriticalFinding />} />
                <Route path="/wetreads" element={<WetReads />} />
                <Route path="/attacheddocument" element={<AttachedDocument />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/test" element={<Test />} />
              </Route>
              {/* Redirect to login if not authenticated */}
              <Route path="*" element={<Navigate to="/" />} />
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