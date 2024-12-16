import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Menubar from '../../components/menubar/Menubar'
import Footer from '../../components/footer/Footer'

function StudyDetails() {
  const [selectedSecValue, setSelectedSecValue] = useState("");
  const [selectedFisValue, setSelectedFisValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const flags = {
    USA: "🇺🇸",
    Canada: "🇨🇦",
    Pakistan: "🇵🇰",
    Saudia: "🇸🇦",
    Oman: "🇴🇲",
  };


  return (
    <div>
      
      <div className='bg-white border rounded-3xl mt-10 p-2'>

        <div className='bg-gray-200 border rounded-3xl p-6'>
          <div>
            <h1>Study Details</h1>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-7  gap-2  place-content-center  '>

            <div className='flex flex-col'>
              <label htmlFor="">Study type</label>
              <select
                id="study-type"
                className="w-full border p-3 rounded-full mt-2"
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
            <div className='flex flex-col '>
              <label htmlFor="">Study type</label>
              <select
                id="study-type"
                className="w-auto border p-3 rounded-full mt-2"
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
            <div className='flex flex-col '>
              <label htmlFor="">Study type</label>
              <select
                id="study-type"
                className="w-auto border p-3 rounded-full mt-2"
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


          </div>
        </div>
        <div className='bg-gray-200 border rounded-3xl p-6 mt-2'>
          <div>
            <h1>Clinical History</h1>
          </div>
          <div className='bg-white p-6 m-3 rounded-2xl text-[#5F6368]'>
            <h1>The patient presents with a recent onset of intermittent lameness in the right hind leg, accompanied by mild swelling in the affected area. There is no reported history of trauma, suggesting a possible underlying condition. A thorough examination and diagnostic imaging, including X-rays and an MRI, are recommended to assess for any structural abnormalities or soft tissue injuries. Based on the findings, the doctor may suggest a treatment plan that could include rest, anti-inflammatory medications, or physical therapy to aid recovery.</h1>
          </div>
          <div className='mt-2.5 mx-3 flex flex-col xl:flex-row gap-1'>
            <div className="flex flex-col md:flex-row gap-1 space-y-2.5 md:space-y-0  ">
              <div className="bg-white h-12 w-auto sm:w-96 rounded-full p-2.5 text-[#5F6368]">
                <h1>Has been administered?</h1>
              </div>
              <div className="flex gap-1">
                {/* Yes Radio Button */}
                <div
                  className={`gap-3 flex py-3 place-content-center h-12 w-24 rounded-full ${selectedFisValue === "yes1" ? "bg-[#CBEA7B80]" : "bg-white"
                    }`}
                >
                  <div>
                    <input
                      type="radio"
                      name="contrast"
                      id="yes1"
                      value="yes1"
                      checked={selectedFisValue === "yes1"}
                      onChange={() => setSelectedFisValue("yes1")}
                    />
                  </div>
                  <div>
                    <span>Yes</span>
                  </div>
                </div>
                {/* No Radio Button */}
                <div
                  className={`gap-3 flex py-3 place-content-center h-12 w-24 rounded-full ${selectedFisValue === "no1" ? "bg-[#CBEA7B80]" : "bg-white"
                    }`}
                >
                  <div>
                    <input
                      type="radio"
                      name="contrast"
                      id="no1"
                      value="no1"
                      checked={selectedFisValue === "no1"}
                      onChange={() => setSelectedFisValue("no1")}
                    />
                  </div>
                  <div>
                    <span>No</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-1 space-y-2.5 md:space-y-0 mt-2.5 xl:mt-0  ">
              <div className="bg-white h-12 w-auto sm:w-96 rounded-full p-2.5 text-[#5F6368]">
                <h1>Has been administered?</h1>
              </div>
              <div className="flex gap-1">
                {/* Yes Radio Button */}
                <div
                  className={`gap-3 flex py-3 place-content-center h-12 w-24 rounded-full ${selectedSecValue === "yes2" ? "bg-[#CBEA7B80]" : "bg-white"
                    }`}
                >
                  <div>
                    <input
                      type="radio"
                      name="administered"
                      id="yes2"
                      value="yes2"
                      checked={selectedSecValue === "yes2"}
                      onChange={() => setSelectedSecValue("yes2")}
                    />
                  </div>
                  <div>
                    <span>Yes</span>
                  </div>
                </div>
                {/* No Radio Button */}
                <div
                  className={`gap-3 flex py-3 place-content-center h-12 w-24 rounded-full ${selectedSecValue === "no2" ? "bg-[#CBEA7B80]" : "bg-white"
                    }`}
                >
                  <div>
                    <input
                      type="radio"
                      name="administered"
                      id="no2"
                      value="no2"
                      checked={selectedSecValue === "no2"}
                      onChange={() => setSelectedSecValue("no2")}
                    />
                  </div>
                  <div>
                    <span>No</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className='bg-gray-200 border rounded-3xl p-6 mt-3'>
          <div>
            <h1>Clinical Information</h1>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-7  gap-2  place-content-center  '>

            <div className='flex flex-col'>
              <label htmlFor="">Clinic Name</label>
              <input type="text" required className='h-12 w-full p-2 mt-2 rounded-full' placeholder='Chest' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="">Physician Name</label>
              <input type="text" className='h-12 w-full p-2 mt-2 rounded-full' placeholder='MRI' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="">Credentials</label>
              <input type="text" className='h-12 w-full p-2 mt-2 rounded-full' placeholder='MRI' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="">Study type</label>
              <div className="relative w-full">
                <span className="absolute left-2 top-1/2 place-content-center justify-items-center h-8 w-8 mt-1 transform -translate-y-1/2 bg-gray-200 rounded-full px-1.5">
                  {flags[selectedCountry] || "🌐"}
                </span>
                <select
                  id="study-type"
                  className="w-full  p-3 rounded-full mt-2 pl-16"
                  defaultValue=""
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="" disabled>
                    Select a country
                  </option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Saudia">Saudia</option>
                  <option value="Oman">Oman</option>
                </select>
              </div>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="">Study type</label>
              <div className="relative w-full">
                <span className="absolute left-2 top-1/2 place-content-center justify-items-center h-8 w-8 mt-1 transform -translate-y-1/2 bg-gray-200 rounded-full px-1.5">
                  {flags[selectedCountry] || "🌐"}
                </span>
                <select
                  id="study-type"
                  className="w-full  p-3 rounded-full mt-2 pl-16"
                  defaultValue=""
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="" disabled>
                    91
                  </option>
                  <option value="USA">+91</option>
                  <option value="Canada">+90</option>
                  <option value="Pakistan">+92</option>
                  <option value="Saudia">+96</option>
                  <option value="Oman">+97</option>
                </select>
              </div>


            </div>





          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default StudyDetails
