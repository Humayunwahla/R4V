import React, { useState } from 'react'
import minus from '../../assets/icons/minus.png'
import add from '../../assets/icons/add.png'
import adding from '../../assets/icons/adding.png'
import dots from '../../assets/icons/dots.png'
import './Navbar.css'
import { FaBars, FaTimes } from 'react-icons/fa'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className='bg-white  w-full rounded-full lg:h-16 place-content-center items-center p-2 flex justify-between'>
    {/* Burger Icon for Small Screens */}
    <div className="lg:hidden flex items-center justify-start w-8/12 p-2">
        <button
          onClick={toggleMenu}
          className="text-xl bg-gray-200 rounded-full p-2"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Grid Section - Show in Burger Menu for Small Screens */}
      {menuOpen && (
        <div className="lg:hidden bg-gray-50 rounded-md shadow-md p-4 absolute top-16 left-0 w-full z-10">
          <button
      onClick={toggleMenu}
      className="absolute top-2 right-2 text-xl bg-gray-200 rounded-full p-2 z-20"
    >
      <FaTimes size={24} />
    </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex gap-2">
              <h1>
                Patient Name: <span className="font-bold">Dog</span>
              </h1>
              <h1 className="navbar-hafin">-</h1>
            </div>
            <div className="flex gap-2">
              <h1>
                Acc#: <span className="font-bold">3567s34244</span>
              </h1>
              <h1 className="navbar-hafin">-</h1>
            </div>
            <div className="flex gap-2">
              <h1>
                DOB: <span className="font-bold">12-12-2016</span>
              </h1>
              <h1 className="navbar-hafin">-</h1>
            </div>
            <div className="flex gap-2">
              <h1>
                Modality: <span className="font-bold">MRI</span>
              </h1>
              <h1 className="navbar-hafin">-</h1>
            </div>
            <div className="flex">
              <h1>
                Gender: <span className="font-bold">Male</span>
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Grid Section - Always Visible for Large Screens */}
      <div className="hidden lg:flex gap-3 place-content-center ml-4">
     
          <h1>
            Patient Name: <span className="font-bold">Dog</span>
          </h1>
          <h1 className="">-</h1>
      
          <h1>
            Acc#: <span className="font-bold">3567s34244</span>
          </h1>
          <h1 className="">-</h1>
        
        
          <h1>
            DOB: <span className="font-bold">12-12-2016</span>
          </h1>
          <h1 className="">-</h1>
       
       
          <h1>
            Modality: <span className="font-bold">MRI</span>
          </h1>
          <h1 className="">-</h1>
       
       
          <h1>
            Gender: <span className="font-bold">Male</span>
          </h1>
        
      </div>



     <div className='flex w-3/5 sm:w-auto gap-4 place-content-center items-center'>
      <div>
        <img src={minus} alt=""  className='w-3.5 h-3.5'/>
      </div>
      <div>
        <img src={add} alt="" className='w-3.5 h-3.5' />
      </div>
      <div className='w-10 h-10 rounded-full bg-gray-200 place-content-center justify-items-center'>
       <img src={adding} alt="" className='w-6 h-6' />
      </div>
      <div className='bg-[#CBEA7B] w-10 h-10 rounded-full place-content-center justify-items-center'>
                              <img src={dots} alt=""  className='w-1 h-4 '/>
                           </div>
     </div>
    </div>
  )
}
export default Navbar
