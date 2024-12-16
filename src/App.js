import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Landingpage from './components/Landingpage';
import Patient from './pages/patient/Patient';
import StudyDetails from './pages/studyDetails/StudyDetails';
import CriticalFinding from './pages/criticalFinding/CriticalFinding';
import WetReads from './pages/wetReads/WetReads';
import AttachedDocument from './pages/attachedDocument/AttachedDocument';
import Layout from './Layout';
function App() {
  return (
    <div className='p-3'>

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

    </div>
  );
}

export default App;
