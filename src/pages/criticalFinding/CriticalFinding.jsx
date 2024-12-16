import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Menubar from '../../components/menubar/Menubar'
import Footer from '../../components/footer/Footer'
import { IoAddSharp } from "react-icons/io5";

function CriticalFinding() {
    return (
        <div>
           
            <div className='bg-white border rounded-3xl mt-10 p-2'>


                <div className='bg-gray-200 border rounded-3xl p-6 mt-2'>
                    <div>
                        <h1>Finding code</h1>
                    </div>
                    <h1 className='mt-3'>Select Finding Code</h1>
                    <div className='flex gap-1'>

                        <div className='bg-white px-3 rounded-full h-11 w-80 text-[#5F6368] place-content-center mt-3 '>
                            <h1>Finding code</h1>
                        </div>
                        <div className='bg-white px-3 rounded-full h-11 w-11 place-content-center mt-3 justify-items-center '>
                            <IoAddSharp />
                        </div>

                    </div>

                </div>
                <div className='bg-gray-200 border rounded-3xl p-6 mt-2'>
                    <div>
                        <h1>Finding description</h1>
                    </div>
                    <h1 className='mt-3'>Select Finding description</h1>
                    <div className='flex gap-1'>

                        <div className='bg-white xl:px-3 p-6 xl:p-1  rounded-3xl xl:rounded-full h-auto xl:h-11 w-full text-[#5F6368] place-content-center mt-3 '>
                            <h1>View the preview screen to see your pet's leg scans. Keep an eye on mobility changes, especially if there's limping or discomfort.</h1>
                        </div>
                        <div className='bg-white px-3 rounded-full h-11 w-11 place-content-center mt-3 justify-items-center '>
                            <IoAddSharp />
                        </div>

                    </div>

                </div>

            </div>
            <Footer />
        </div>
    )
}

export default CriticalFinding
