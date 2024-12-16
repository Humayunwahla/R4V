import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Menubar from '../../components/menubar/Menubar'
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
            <div className='lg:w-2/6  space-y-1'>
               {/** Report Audio section */}
               <div className='bg-white rounded-2xl p-3'>
                  <div className='flex gap-2  justify-between'>
                     <div className='flex gap-2 '>
                        <div className='w-1/6'>

                           <div className='w-11 h-11 bg-gray-200 rounded-full place-content-center justify-items-center '>
                              <img src={mic} alt="" className='w-5 h-5' />
                           </div>
                        </div>
                        <div className=''>
                           <h1 className='font-bold'>Report Audio</h1>
                           <h1 className='macros-text'>Find your saved your templates here</h1>
                        </div>
                        <div className='flex gap-1'>

                           <div className='w-8 h-8 bg-gray-200 rounded-full place-content-center justify-items-center '>
                              <img src={addphoto} alt="" className='w-4 h-4' />
                           </div>
                           <div className='w-8 h-8 bg-gray-200 rounded-full place-content-center justify-items-center '>
                              <img src={text} alt="" className='w-4 h-4' />
                           </div>
                           <div className='w-8 h-8 bg-gray-200 rounded-full place-content-center justify-items-center '>
                              <img src={deleted} alt="" className='w-4 h-4' />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className='w-full flex justify-between place-content-center items-center gap-1  p-5 mt-3'>
                     <div className=' rounded-full place-content-center justify-items-center'>
                        <button
                           className={`mt-3 w-10 h-10 rounded-full ${isRecording ? 'bg-red-500' : 'bg-gray-200'
                              } flex items-center justify-center`}
                           onClick={handleStartStopRecording}
                        >
                           <FontAwesomeIcon
                              icon={isRecording ? faPause : faPlay}
                              className="text-black w-4 h-4"
                           />
                        </button>
                     </div>
                     <div>
                        <ReactMic
                           record={isRecording}
                           className=" w-fit lg:w-full xl:w-80 h-8"
                           onStop={handleOnStop}
                           strokeColor=""
                           backgroundColor="#FFFFFF"
                        />

                     </div>
                  </div>

                  <div className='flex relative mb-9 mt-12'>
                     <div className='bg-[#CBEA7B] border-4 w-16 h-16 rounded-full place-content-center justify-items-center  absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                        <img src={micwhite} alt="" className='w-4 h-5' />
                     </div>
                     <div className='h-7 w-16 bg-[#EAEAEA] place-content-center justify-items-center rounded-full absolute  right-4 flex items-center justify-center'>
                        <h1 className='text-xs font-semibold  '>1:30 min</h1>
                     </div>
                     <div>

                     </div>
                  </div>
               </div>

               {/** Templates Secction */}
               <div className='bg-white rounded-2xl p-3'>
                  <div className='flex gap-2  justify-between'>
                     <div className='flex gap-2'>

                        <div className='w-11 h-11 bg-gray-200 rounded-full place-content-center justify-items-center '>
                           <img src={copy} alt="" className='w-5 h-5' />
                        </div>
                        <div className='text-xs'>
                           <h1 className='font-bold'>Templates</h1>
                           <h1 className='text-xs'>Find your saved your templates here</h1>
                        </div>
                     </div>
                     <div className='gap-1 flex'>

                        <div className='bg-[#EAEAEA] w-10 h-10 rounded-full place-content-center justify-items-center'>
                           <img src={filter} alt="" className='w-6 h-6 ' />
                        </div>
                        <div className='bg-[#CBEA7B] w-10 h-10 rounded-full place-content-center justify-items-center'>
                           <img src={dots} alt="" className='w-1 h-4 ' />
                        </div>
                     </div>
                  </div>
                  <div className='w-full  bg-gray-300   items-center h-auto p-3 rounded-2xl mt-3'>
                     <div className='gap-2 flex'>

                        <div className='w-8 h-8 place-content-center justify-items-center bg-black rounded-full'>
                           <img src={dot} alt="" className='w-2 h-3' />
                        </div>
                        <h1 className='font-normal place-content-center'>Template name</h1>
                     </div>
                     <div className='gap-2 mt-2 flex flex-wrap '>
                        <div className='w-auto px-3 h-8 bg-white rounded-full p-2 text-xs place-content-center justify-items-center '>
                           <h1 className='template-subheading'>Species: Bull Dog</h1>
                        </div>
                        <div className='w-auto px-3 h-8 bg-white rounded-full p-2 text-xs place-content-center justify-items-center '>
                           <h1 className='template-subheading'>Modality: MRI</h1>
                        </div>
                        <div className='w-auto px-3 h-8 bg-white rounded-full p-2 text-xs place-content-center justify-items-center '>
                           <h1 className='template-subheading'>Study: Chest</h1>
                        </div>
                        <div className='w-auto px-3 h-8 bg-white rounded-full  text-xs place-content-center justify-items-center  '>
                           <h1 className='template-subheading '>User ID: 3567s34244</h1>
                        </div>
                     </div>

                  </div>


               </div>

               {/** Macros Section */}
               <div className="p-3 bg-white rounded-2xl  ">
                  <div className="flex gap-2 justify-between ">
                     <div className="flex gap-2">
                        <div className="w-11 h-11 bg-gray-200 rounded-full place-content-center justify-items-center">
                           <img src={copy} alt="" className="w-5 h-5" />
                        </div>
                        <div className="text-xs">
                           <h1 className="font-bold">Macros</h1>
                           <h1 className="text-xs">Find your saved Macros here</h1>
                        </div>
                     </div>
                     <div className="gap-1 flex">
                        <div className="bg-[#EAEAEA] w-10 h-10 rounded-full place-content-center justify-items-center">
                           <img src={filter} alt="" className="w-6 h-6" />
                        </div>
                        <div className="bg-[#CBEA7B] w-10 h-10 rounded-full place-content-center justify-items-center">
                           <img src={dots} alt="" className="w-1 h-4" />
                        </div>
                     </div>
                  </div>
                  <div className="space-y-1 blur-overlay blur-bottom macros-height overflow-scroll custom-scrollbar ">
                     <div className='w-full flex gap-2  bg-gray-300  place-content-center  items-center h-auto p-3 rounded-2xl mt-3'>
                        <div className='w-8 h-8 place-content-center justify-items-center bg-black rounded-full'>
                           <img src={dot} alt="" className='w-2 h-3' />
                        </div>
                        <div className='w-11/12'>

                           <h1 className=' macros-text'>Praesentium maxime minus quia dolorum mollitia magni sunt voluptate. Excepturi quia ipsum eum. Dolores ipsa dolor neque ut laborum. Eligendi impedit rerum rerum dolorum. </h1>
                        </div>
                     </div>
                     <div className='w-full flex gap-2  bg-gray-300  place-content-center  items-center h-auto p-3 rounded-2xl mt-3'>
                        <div className='w-8 h-8 place-content-center justify-items-center bg-black rounded-full'>
                           <img src={dot} alt="" className='w-2 h-3' />
                        </div>
                        <div className='w-11/12'>

                           <h1 className=' macros-text'>Praesentium maxime minus quia dolorum mollitia magni sunt voluptate. Excepturi quia ipsum eum. Dolores ipsa dolor neque ut laborum. Eligendi impedit rerum rerum dolorum. </h1>
                        </div>
                     </div>
                     <div className='w-full flex gap-2  bg-gray-300  place-content-center  items-center h-auto p-3 rounded-2xl mt-3'>
                        <div className='w-8 h-8 place-content-center justify-items-center bg-black rounded-full'>
                           <img src={dot} alt="" className='w-2 h-3' />
                        </div>
                        <div className='w-11/12'>

                           <h1 className=' macros-text'>Praesentium maxime minus quia dolorum mollitia magni sunt voluptate. Excepturi quia ipsum eum. Dolores ipsa dolor neque ut laborum. Eligendi impedit rerum rerum dolorum. </h1>
                        </div>
                     </div>
                     <div className='w-full flex gap-2  bg-gray-300  place-content-center  items-center h-auto p-3 rounded-2xl mt-3'>
                        <div className='w-8 h-8 place-content-center justify-items-center bg-black rounded-full'>
                           <img src={dot} alt="" className='w-2 h-3' />
                        </div>
                        <div className='w-11/12'>

                           <h1 className=' macros-text'>Praesentium maxime minus quia dolorum mollitia magni sunt voluptate. Excepturi quia ipsum eum. Dolores ipsa dolor neque ut laborum. Eligendi impedit rerum rerum dolorum. </h1>
                        </div>
                     </div>
                     <div className='w-full flex gap-2  bg-gray-300  place-content-center  items-center h-auto p-3 rounded-2xl mt-3'>
                        <div className='w-8 h-8 place-content-center justify-items-center bg-black rounded-full'>
                           <img src={dot} alt="" className='w-2 h-3' />
                        </div>
                        <div className='w-11/12'>

                           <h1 className=' macros-text'>Praesentium maxime minus quia dolorum mollitia magni sunt voluptate. Excepturi quia ipsum eum. Dolores ipsa dolor neque ut laborum. Eligendi impedit rerum rerum dolorum. </h1>
                        </div>
                     </div>
                     <div className='w-full flex gap-2  bg-gray-300  place-content-center  items-center h-auto p-3 rounded-2xl mt-3'>
                        <div className='w-8 h-8 place-content-center justify-items-center bg-black rounded-full'>
                           <img src={dot} alt="" className='w-2 h-3' />
                        </div>
                        <div className='w-11/12'>

                           <h1 className=' macros-text'>Praesentium maxime minus quia dolorum mollitia magni sunt voluptate. Excepturi quia ipsum eum. Dolores ipsa dolor neque ut laborum. Eligendi impedit rerum rerum dolorum. </h1>
                        </div>
                     </div>
                     <div className='w-full flex gap-2  bg-gray-300  place-content-center  items-center h-auto p-3 rounded-2xl mt-3'>
                        <div className='w-8 h-8 place-content-center justify-items-center bg-black rounded-full'>
                           <img src={dot} alt="" className='w-2 h-3' />
                        </div>
                        <div className='w-11/12'>

                           <h1 className=' macros-text'>Praesentium maxime minus quia dolorum mollitia magni sunt voluptate. Excepturi quia ipsum eum. Dolores ipsa dolor neque ut laborum. Eligendi impedit rerum rerum dolorum. </h1>
                        </div>
                     </div>

                  </div>

               </div>
            </div>
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
