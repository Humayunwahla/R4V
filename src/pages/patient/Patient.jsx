import React, { useState } from 'react'
import RTE from '../../components/RTE'
import dot from '../../assets/icons/dot.png'
import dots from '../../assets/icons/dots.png'
import copy from '../../assets/icons/copy.png'
import mic from '../../assets/icons/mic.png'
import addphoto from '../../assets/icons/addphoto.png'
import deleted from '../../assets/icons/deleted.png'
import text from '../../assets/icons/text.png'
import micwhite from '../../assets/icons/mic-white.png'
import filter from '../../assets/icons/filter.png'
import { ReactMic } from 'react-mic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, } from '@fortawesome/free-solid-svg-icons';
import './Patient.css'
import { BsViewStacked } from "react-icons/bs";
import { RiFilter2Line } from "react-icons/ri";
import Patient_Sidebar from './Patient_Sidebar'
function Patient() {
   const [isRecording, setIsRecording] = useState(false);
   const [recordedAudio, setRecordedAudio] = useState(null);
   const handleStartStopRecording = () => {
      setIsRecording((prevState) => !prevState);
   };
   const handleOnStop = (recordedBlob) => {
      console.log('Recorded Blob:', recordedBlob);
      setRecordedAudio(recordedBlob);
      // Process the audio blob here (e.g., send it to a speech-to-text API)
   };
   return (
      <div>
         <div className='flex flex-col lg:flex-row mt-6 gap-1'>
            <div className='lg:w-4/6'>
               <RTE name="editor" heightValue={800} label="Body" defaultValue="Initial content for Card 2" />
            </div>
            {/**sidebar section */}
            <Patient_Sidebar />
         </div>
         {/**Button section */}
         <div className="space-x-3  gap-4 font-poppins mt-3 ">
            <button className="border bg-[#CBEA7B80] h-10 rounded-full px-3 mt-2">Save </button>
            <button className="border bg-[#CBEA7B80] h-10 rounded-full px-3 mt-2">Suspend</button>
            <button className="border bg-[#CBEA7B80] h-10 rounded-full px-3 mt-2">Sign</button>
            <button className="border bg-[#CBEA7B80] h-10 rounded-full px-3 mt-2">Next Study</button>
            <button className="border bg-[#CBEA7B80] h-10 rounded-full px-3 mt-2">Sign and Assign</button>
         </div>
         {/**Table Navbar */}
         <div className='mt-8 justify-between flex'>
            <div className='place-content-center'>
               <h1>Prior Reports</h1>
            </div>
            <div className='flex gap-1'>
               <div className='bg-gray-200 w-10 h-10 place-content-center justify-items-center rounded-full'>
                  <BsViewStacked />
               </div>
               <div className='bg-gray-200 w-10 h-10 place-content-center justify-items-center rounded-full'>
                  <RiFilter2Line />
               </div>
               <div className='bg-[#CBEA7B] w-10 h-10 place-content-center justify-items-center rounded-full'>
                  <img src={dots} alt="" className='w-1 h-4' />
               </div>
            </div>
         </div>
         {/**Table Section */}
         <div className="overflow-x-auto mt-3 mb-3">
            <table className="table-auto bg-white border-separate text-center border-spacing-0 border-sm rounded-3xl w-full">
               <thead>
                  <tr className='table-heading  text-center'>
                     <th className="border border-gray-300 p-2 rounded-tl-3xl">PID</th>
                     <th className="border  px-2 py-2 justify-items-center ">
                        <div className='flex  gap-2'>
                           <p>Study Type</p>
                           <span className='bg-gray-200 w-6 h-6 rounded-full place-content-center justify-items-center'>
                              <RiFilter2Line />
                           </span>
                        </div>
                     </th>
                     <th className="border  px-2 py-2 justify-items-center ">
                        <div className='flex  gap-2'>
                           <p>Acc#</p>
                           <span className='bg-gray-200 w-6 h-6 rounded-full place-content-center justify-items-center'>
                              <RiFilter2Line />
                           </span>
                        </div>
                     </th>
                     <th className="border  px-2 py-2 justify-items-center ">
                        <div className='flex  gap-2'>
                           <p>Study Date</p>
                           <span className='bg-gray-200 w-6 h-6 rounded-full place-content-center justify-items-center'>
                              <RiFilter2Line />
                           </span>
                        </div>
                     </th>
                     <th className="border  px-2 py-2 justify-items-center ">
                        <div className='flex  gap-2'>
                           <p>Ref Phys</p>
                           <span className='bg-gray-200 w-6 h-6 rounded-full place-content-center justify-items-center'>
                              <RiFilter2Line />
                           </span>
                        </div>
                     </th>
                     <th className="border  px-2 py-2 justify-items-center ">
                        <div className='flex  gap-2'>
                           <p>Signed By</p>
                           <span className='bg-gray-200 w-6 h-6 rounded-full place-content-center justify-items-center'>
                              <RiFilter2Line />
                           </span>
                        </div>
                     </th>
                     <th className="border  px-2 py-2 justify-items-center ">
                        <div className='flex  gap-2'>
                           <p>Attachments</p>
                           <span className='bg-gray-200 w-6 h-6 rounded-full place-content-center justify-items-center'>
                              <RiFilter2Line />
                           </span>
                        </div>
                     </th>
                     <th className="border  px-2 py-2 rounded-tr-3xl justify-items-center ">
                        <div className='flex  gap-2'>
                           <p>Status</p>
                           <span className='bg-gray-200 w-6 h-6 rounded-full place-content-center justify-items-center'>
                              <RiFilter2Line />
                           </span>
                        </div>
                     </th>
                  </tr>
               </thead>
               <tbody>
                  <tr className=''>
                     <td className="border border-gray-300 p-2 space-x-1">
                        <span>1</span>
                        <input
                           type="checkbox"
                           className="appearance-none border  h-3 w-3 rounded-full border-gray-300 focus:ring-2 checked:ring-blue-500"
                        />
                     </td>
                     <td className="border border-gray-300 p-2">Row 1, Cell 2</td>
                     <td className="border border-gray-300 p-2">Row 1, Cell 3</td>
                     <td className="border border-gray-300 p-2">Row 1, Cell 4</td>
                     <td className="border border-gray-300 p-2">Row 1, Cell 5</td>
                     <td className="border border-gray-300 p-2">Row 1, Cell 6</td>
                     <td className="border border-gray-300 p-2">Row 1, Cell 7</td>
                     <td className="border border-gray-300 p-2">Row 1, Cell 8</td>
                  </tr>
                  <tr>
                     <td className="border border-gray-300 p-2 space-x-1">
                        <span>2</span>
                        <input
                           type="checkbox"
                           className="appearance-none border  h-3 w-3 rounded-full border-gray-300 focus:ring-2 checked:ring-blue-500"
                        />
                     </td>
                     <td className="border border-gray-300 p-2">Row 2, Cell 2</td>
                     <td className="border border-gray-300 p-2">Row 2, Cell 3</td>
                     <td className="border border-gray-300 p-2">Row 2, Cell 4</td>
                     <td className="border border-gray-300 p-2">Row 2, Cell 5</td>
                     <td className="border border-gray-300 p-2">Row 2, Cell 6</td>
                     <td className="border border-gray-300 p-2">Row 2, Cell 7</td>
                     <td className="border border-gray-300 p-2">Row 2, Cell 8</td>
                  </tr>
                  <tr>
                     <td className="border border-gray-300 p-2 space-x-1">
                        <span>3</span>
                        <input
                           type="checkbox"
                           className="appearance-none border  h-3 w-3 rounded-full border-gray-300 focus:ring-2 checked:ring-blue-500"
                        />
                     </td>
                     <td className="border border-gray-300 p-2">Row 3, Cell 2</td>
                     <td className="border border-gray-300 p-2">Row 3, Cell 3</td>
                     <td className="border border-gray-300 p-2">Row 3, Cell 4</td>
                     <td className="border border-gray-300 p-2">Row 3, Cell 5</td>
                     <td className="border border-gray-300 p-2">Row 3, Cell 6</td>
                     <td className="border border-gray-300 p-2">Row 3, Cell 7</td>
                     <td className="border border-gray-300 p-2">Row 3, Cell 8</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   )
}
export default Patient