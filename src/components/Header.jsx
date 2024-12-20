import React, { useContext, useState } from 'react'
import logo from "../assets/icons/logo.png"
import dropdown from '../assets/icons/dropdown.png'
import notification from '../assets/icons/notification.png'
import message from '../assets/icons/message.png'
import analytics from '../assets/icons/analytics.png'
import profile from '../assets/icons/profile.png'
import { UserContext } from '../context/UserContext/userContext'

function Header() {
  const { handleLogout, accessToken } = useContext(UserContext);
  // console.log("TOKEN", accessToken);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };


  return (
    <div className=''>
      <div className='p-5 xl:p-8  flex  justify-between items-center'>

        <div>
          <img src={logo} alt="" className='w-20 h-6' />
        </div>
        <div className='hidden gap-1.5 xl:gap-3 lg:flex flex-row '>

          <button className='flex bg-gray-200 rounded-full h-10 xl:h-11 justify-between px-3 xl:px-5 gap-2.5 items-center'>

            <h1 className='text-xs xl:text-sm'>Masters</h1>


            <img src={dropdown} alt="" className='w-2.5 h-1.5 ' />

          </button>
          <button className='flex bg-gray-200 rounded-full  h-10 xl:h-11 justify-between px-3 xl:px-5 gap-2.5 items-center'>

            <h1 className='text-xs xl:text-sm'>Case Management</h1>


            <img src={dropdown} alt="" className='w-2.5 h-1.5 ' />

          </button>
          <button className='flex bg-gray-200 rounded-full  h-10 xl:h-11 justify-between px-3 xl:px-5 gap-2.5 items-center'>

            <h1 className='text-xs xl:text-sm'>Account</h1>


            <img src={dropdown} alt="" className='w-2.5 h-1.5 ' />

          </button>
          <button className='flex bg-gray-200 rounded-full h-10 xl:h-11 justify-between px-3 xl:px-5 gap-2.5 items-center'>

            <h1 className='text-xs xl:text-sm'>Reports</h1>


            <img src={dropdown} alt="" className='w-2.5 h-1.5 ' />

          </button>
          <button className='flex bg-gray-200 rounded-full  h-10 xl:h-11 justify-between px-3 xl:px-5 gap-2.5 items-center'>

            <h1 className='text-xs xl:text-sm'>Dashboard</h1>


            <img src={dropdown} alt="" className='w-2.5 h-1.5 ' />

          </button>
          <button className='flex bg-gray-200 rounded-full  h-10 xl:h-11 justify-between px-3 xl:px-5 gap-2.5 items-center'>

            <h1 className='text-xs xl:text-sm'>App setting</h1>


            <img src={dropdown} alt="" className='w-2.5 h-1.5 ' />

          </button>
        </div>
        {isDrawerOpen && (
          <div className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-4 z-50 space-y-5">
            <div className='flex flex-row justify-between'>
              <button
                className="text-gray-500 mb-4 focus:outline-none"
                onClick={() => setIsDrawerOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className='flex flex-row gap-1'>
                <div className='bg-gray-200 h-7 w-7 rounded-full justify-items-center  place-content-center'>
                  <img src={notification} alt="" className='h-3 w-2 ' />
                </div>
                <div className='bg-gray-200 h-7 w-7 rounded-full justify-items-center  place-content-center'>
                  <img src={message} alt="" className='h-3 w-2 ' />
                </div>
                <div className='bg-gray-200 h-7 w-7 rounded-full justify-items-center  place-content-center'>
                  <img src={analytics} alt="" className='h-5 w-3 ' />
                </div>
              </div>
              <div>
                <button className='flex bg-gray-200 rounded-full h-7 justify-between  pr-2 gap-2 items-center'>

                  <img src={profile} alt="" className='w-7 h-7 rounded-full' />


                  <img src={dropdown} alt="" className='w-2 h-1.5 ' />

                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button className="flex bg-gray-200 rounded-full h-11 justify-between px-2 gap-2 items-center">
                <h1 className="text-sm">Masters</h1>
                <img src={dropdown} alt="" className="w-2 h-1.5" />
              </button>
              <button className="flex bg-gray-200 rounded-full h-11 justify-between px-2 gap-2 items-center">
                <h1 className="text-sm">Case Management</h1>
                <img src={dropdown} alt="" className="w-2 h-1.5" />
              </button>
              <button className="flex bg-gray-200 rounded-full h-11 justify-between px-2 gap-2 items-center">
                <h1 className="text-sm">Account</h1>
                <img src={dropdown} alt="" className="w-2 h-1.5" />
              </button>
              <button className="flex bg-gray-200 rounded-full h-11 justify-between px-2 gap-2 items-center">
                <h1 className="text-sm">Reports</h1>
                <img src={dropdown} alt="" className="w-2 h-1.5" />
              </button>
              <button className="flex bg-gray-200 rounded-full h-11 justify-between px-2 gap-2 items-center">
                <h1 className="text-sm">Dashboard</h1>
                <img src={dropdown} alt="" className="w-2 h-1.5" />
              </button>
              <button className="flex bg-gray-200 rounded-full h-11 justify-between px-2 gap-2 items-center">
                <h1 className="text-sm">App Setting</h1>
                <img src={dropdown} alt="" className="w-2 h-1.5" />
              </button>
            </div>
          </div>
        )}
        <div className='hidden  lg:flex flex-row gap-1'>
          <div className='bg-gray-200 w-9 h-9 xl:h-12 xl:w-12 rounded-full justify-items-center  place-content-center'>
            <img src={notification} alt="" className=' h-3 w-2 xl:h-5 xl:w-4 ' />
          </div>
          <div className='bg-gray-200 w-9 h-9 xl:h-12 xl:w-12 rounded-full justify-items-center  place-content-center'>
            <img src={message} alt="" className='h-3 w-2 xl:h-5 xl:w-4 ' />
          </div>
          <div className='bg-gray-200 w-9 h-9 xl:h-12 xl:w-12 rounded-full justify-items-center  place-content-center'>
            <img src={analytics} alt="" className='h-3 w-2 xl:h-5 xl:w-4 ' />
          </div>
        </div>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="hidden lg:flex bg-gray-200 rounded-full h-9 xl:h-11 justify-between pr-2 gap-2 items-center"
          >
            <img src={profile} alt="Profile" className="h-8 w-8 xl:w-10 xl:h-10 rounded-full" />
            <img src={dropdown} alt="Dropdown" className="w-2 h-1.5" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-5 w-48 bg-gray-300 shadow-md rounded-md z-50">
              <button
                onClick={() => handleLogout()}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        {/* Drawer Toggle Button (Visible on Small Devices) */}
        <div className="lg:hidden">
          <button
            className="text-gray-500 focus:outline-none"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}

export default Header
