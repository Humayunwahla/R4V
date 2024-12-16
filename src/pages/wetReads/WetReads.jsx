import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Menubar from '../../components/menubar/Menubar';
import Footer from '../../components/footer/Footer';
import RTE from '../../components/RTE';

function WetReads() {
  // Separate state for each checkbox
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);

  return (
    <div>
      
      <div className='bg-white border rounded-3xl mt-10 p-2'>
        <div className='bg-gray-200 border rounded-3xl p-6 mt-2'>
          <div>
            <h1>Text Box</h1>
          </div>
          <div className='px-3 mt-3'>
            <textarea className='w-full p-3 rounded-3xl' placeholder='Add your Text here...' rows="6"></textarea>
          </div>
        </div>
        <div className='bg-gray-200 border rounded-3xl p-6 mt-2'>
          <div>
            <h1>Wet Reads</h1>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-1'>
            {/* Div 1 */}
            <div
              className={`p-2.5 xl:px-3 flex justify-between rounded-3xl sm:rounded-full h-auto sm:h-11 w-full text-[#5F6368] place-content-center mt-3 ${
                isChecked1 ? 'bg-[#CBEA7B80]' : 'bg-white'
              }`}
            >
              <h1 className='w-10/12'>Have you noticed any recent limping in the right hind leg?</h1>
              <input
                type="checkbox"
                checked={isChecked1}
                onChange={() => setIsChecked1(!isChecked1)}
                className="appearance-none h-4 w-4 mt-1 border-2 border-gray-600 rounded-full checked:bg-blue-500 checked:ring-2 checked:ring-blue-500 checked:ring-offset-2"
              />
            </div>
            {/* Div 2 */}
            <div
              className={`p-2.5 xl:px-3 flex justify-between rounded-3xl sm:rounded-full h-auto sm:h-11 w-full text-[#5F6368] place-content-center mt-3 ${
                isChecked2 ? 'bg-[#CBEA7B80]' : 'bg-white'
              }`}
            >
              <h1 className='w-10/12'>Have you noticed any recent limping in the right hind leg?</h1>
              <input
                type="checkbox"
                checked={isChecked2}
                onChange={() => setIsChecked2(!isChecked2)}
                className="appearance-none h-4 w-4 mt-1 border-2 border-gray-600 rounded-full checked:bg-blue-500 checked:ring-2 checked:ring-blue-500 checked:ring-offset-2"
              />
            </div>
            {/* Div 3 */}
            <div
              className={`p-2.5 xl:px-3 flex justify-between rounded-3xl sm:rounded-full h-auto sm:h-11 w-full text-[#5F6368] place-content-center mt-3 ${
                isChecked3 ? 'bg-[#CBEA7B80]' : 'bg-white'
              }`}
            >
              <h1 className='w-10/12'>Have you noticed any recent limping in the right hind leg?</h1>
              <input
                type="checkbox"
                checked={isChecked3}
                onChange={() => setIsChecked3(!isChecked3)}
                className="appearance-none h-4 w-4 mt-1 border-2 border-gray-600 rounded-full checked:bg-blue-500 checked:ring-2 checked:ring-blue-500 checked:ring-offset-2"
              />
            </div>
            {/* Div 4 */}
            <div
              className={`p-2.5 xl:px-3 flex justify-between rounded-3xl sm:rounded-full h-auto sm:h-11 w-full text-[#5F6368] place-content-center mt-3 ${
                isChecked4 ? 'bg-[#CBEA7B80]' : 'bg-white'
              }`}
            >
              <h1 className='w-10/12'>Have you noticed any recent limping in the right hind leg?</h1>
              <input
                type="checkbox"
                checked={isChecked4}
                onChange={() => setIsChecked4(!isChecked4)}
                className="appearance-none h-4 w-4 mt-1 border-2 border-gray-600 rounded-full checked:bg-blue-500 checked:ring-2 checked:ring-blue-500 checked:ring-offset-2"
              />
            </div>
            {/* Div 5 */}
            <div
              className={`p-2.5 xl:px-3 flex justify-between rounded-3xl sm:rounded-full h-auto sm:h-11 w-full text-[#5F6368] place-content-center mt-3 ${
                isChecked5 ? 'bg-[#CBEA7B80]' : 'bg-white'
              }`}
            >
              <h1 className='w-10/12'>Have you noticed any recent limping in the right hind leg?</h1>
              <input
                type="checkbox"
                checked={isChecked5}
                onChange={() => setIsChecked5(!isChecked5)}
                className="appearance-none h-4 w-4 mt-1 border-2 border-gray-600 rounded-full checked:bg-blue-500 checked:ring-2 checked:ring-blue-500 checked:ring-offset-2"
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col bg-gray-200 border rounded-3xl p-6 mt-2'>
              <label htmlFor="">Study type</label>
              <select
                id="study-type"
                className="sm:w-96 w-full border p-3 rounded-full mt-3 "
                defaultValue=""
              >
                <option value="" disabled className=''>
                  Select Study Type
                </option>
                <option value="Chest">Chest</option>
                <option value="Abdomen">Abdomen</option>
                <option value="Brain">Brain</option>
                <option value="Spine">Spine</option>
                <option value="Pelvis">Pelvis</option>
              </select>
            </div>
            <div>
            <RTE name="editor" label="" heightValue={500} defaultValue="Initial content for Card 1" />
            </div>
      </div>
      <Footer />
    </div>
  );
}

export default WetReads;
