import React, { useContext } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
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
  const { accessToken, isAuthenticated, handleLogin } = useContext(UserContext);
  const getDataFromApi = () => {
    if (!accessToken) {
      console.error("No access token available");
      return;
    }
    const data = JSON.stringify({
      "catalogType": 3
    });
    const config = {
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
      })
      .catch((error) => {
        console.error("API request error", error);
      });
  };
  // console.log("TOKEN", accessToken);
  
  return (
    <div className='p-3 overflow-hidden'>
      {isAuthenticated ? (
        <>
          <Header />
          <Router>
            <div className='fixed bottom-3 right-3 '>
              <Message/>
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
            </Routes>
          </Router>
        </>
      ) : (
        <button onClick={handleLogin}>Login with Microsoft</button>
      )}
    </div>
  );
}
// render(<App />, document.getElementById('root'));
export default App;










