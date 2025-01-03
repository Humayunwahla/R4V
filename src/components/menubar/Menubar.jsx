import React, { useState } from 'react';
import arrow from '../../assets/icons/arrow.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
function Menubar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState(''); // State to track the selected button
  const navigate = useNavigate();
  const location = useLocation();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleButtonClick = (buttonName, targetPath) => {
    if (location.pathname === targetPath) {
      navigate("/patient"); // Go back to the "/patient" page
      setSelectedButton(''); // Reset the selected button
    } else {
      navigate(targetPath); // Navigate to the target page
      setSelectedButton(buttonName); // Update the selected button
    }
  };
  return (
    <div className="flex mt-6 gap-3">
      {/* Back Arrow */}
      <Link to="/">
        <div className="bg-gray-200 h-10 w-10 rounded-full flex justify-center items-center">
          <img src={arrow} alt="Back" className="h-4 w-4" />
        </div>
      </Link>
      {/* Burger Menu Button */}
      <button onClick={toggleMenu} className="lg:hidden absolute right-4">
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      {/* Burger Menu Content */}
      {menuOpen && (
        <div className="lg:hidden bg-gray-50 shadow-md p-4 absolute left-0 w-full z-10">
          <button
            onClick={toggleMenu}
            className="absolute top-2 right-2 text-xl bg-gray-200 rounded-full p-2 z-20"
          >
            <FaTimes size={24} />
          </button>
          <div className="space-y-3 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-poppins">
            <button
              onClick={() => handleButtonClick('Study Details', '/studydetails')}
              className={`border h-10 w-full rounded-full px-3 ${
                selectedButton === 'Study Details' ? 'bg-[#CBEA7B]' : ''
              }`}
            >
              Study Details
            </button>
            <button
              onClick={() =>
                handleButtonClick('Attached Documents', '/attacheddocument')
              }
              className={`border h-10 w-full rounded-full px-3 ${
                selectedButton === 'Attached Documents' ? 'bg-[#CBEA7B]' : ''
              }`}
            >
              Attached Documents
            </button>
            <button
              onClick={() =>
                handleButtonClick('Critical Findings', '/criticalfindings')
              }
              className={`border h-10 w-full rounded-full px-3 ${
                selectedButton === 'Critical Findings' ? 'bg-[#CBEA7B]' : ''
              }`}
            >
              Critical Findings
            </button>
            <button
              onClick={() => handleButtonClick('Wet Reads', '/wetreads')}
              className={`border h-10 w-full rounded-full px-3 ${
                selectedButton === 'Wet Reads' ? 'bg-[#CBEA7B]' : ''
              }`}
            >
              Wet Reads
            </button>
            <button
              onClick={() => handleButtonClick('chat', '/chat')}
              className={`border h-10 w-full rounded-full px-3 ${
                selectedButton === 'chat' ? 'bg-[#CBEA7B]' : ''
              }`}
            >
              Chats
            </button>
          </div>
        </div>
      )}
      {/* Desktop Menu */}
      <div className="hidden lg:flex space-x-3 font-poppins">
        <button
          onClick={() => handleButtonClick('Study Details', '/studydetails')}
          className={`border h-10 rounded-full px-3 ${
            selectedButton === 'Study Details' ? 'bg-[#CBEA7B]' : ''
          }`}
        >
          Study Details
        </button>
        <button
          onClick={() =>
            handleButtonClick('Attached Documents', '/attacheddocument')
          }
          className={`border h-10 rounded-full px-3 ${
            selectedButton === 'Attached Documents' ? 'bg-[#CBEA7B]' : ''
          }`}
        >
          Attached Documents
        </button>
        <button
          onClick={() =>
            handleButtonClick('Critical Findings', '/criticalfindings')
          }
          className={`border h-10 rounded-full px-3 ${
            selectedButton === 'Critical Findings' ? 'bg-[#CBEA7B]' : ''
          }`}
        >
          Critical Findings
        </button>
        <button
          onClick={() => handleButtonClick('Wet Reads', '/wetreads')}
          className={`border h-10 rounded-full px-3 ${
            selectedButton === 'Wet Reads' ? 'bg-[#CBEA7B]' : ''
          }`}
        >
          Wet Reads
        </button>
        <button
          onClick={() => handleButtonClick('chat', '/chat')}
          className={`border h-10 rounded-full px-3 ${
            selectedButton === 'chat' ? 'bg-[#CBEA7B]' : ''
          }`}
        >
          Chats
        </button>
      </div>
    </div>
  );
}
export default Menubar;