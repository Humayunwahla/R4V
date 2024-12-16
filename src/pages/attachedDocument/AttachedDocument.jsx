import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Menubar from '../../components/menubar/Menubar'
import Footer from '../../components/footer/Footer'
import pdfimage from '../../assets/icons/pdfimage.png'
import { FiDownload } from "react-icons/fi";
import pdficon from '../../assets/icons/pdficon.png'
import { MdOutlineFrontHand } from "react-icons/md";
import { TbDropletHalfFilled } from "react-icons/tb";
import { CgEditFlipH } from "react-icons/cg";
import { CgEditFlipV } from "react-icons/cg";
import { MdPreview } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import { MdRotateRight } from "react-icons/md";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import preview from '../../assets/icons/preview.png'
import { FaBars, FaTimes } from 'react-icons/fa';


function AttachedDocument() {
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Dummy PDF files list for example
    const pdfFiles = [
        { id: 1, name: 'Document 1.pdf', image: pdfimage },
        { id: 2, name: 'Document 2.pdf', image: pdficon },
        { id: 3, name: 'Document 3.pdf', image: pdfimage },
    ];

    const handlePdfClick = (pdf) => {
        setSelectedPdf(pdf);
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            
            <div className='mt-6'>

                <div className="flex flex-col xl:flex-row">
                    {/* List of PDFs */}
                    <div className="xl:w-1/2  p-4 bg-white border xl:rounded-tl-3xl xl:rounded-bl-3xl overflow-scroll">
                        <div className="sm:hidden">
                            <button
                                onClick={toggleMenu}
                                className="lg:hidden absolute left-4 z-50"
                            >
                                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </button>
                        </div>
                        <div
                            className={`flex flex-wrap gap-4 mb-8 mt-8 sm:flex ${isMenuOpen ? 'flex' : 'hidden'
                                } sm:block`}
                        >
                            <div className='bg-gray-200 w-10 h-10 rounded-full place-content-center justify-items-center'>
                                <MdOutlineFrontHand className='w-5 h-5' />
                            </div>
                            <div className='bg-gray-200 w-10 h-10 rounded-full place-content-center justify-items-center'>
                                <TbDropletHalfFilled className='w-5 h-5' />
                            </div>
                            <div className='bg-gray-200 w-10 h-10 rounded-full place-content-center justify-items-center'>
                                <CgEditFlipH className='w-5 h-5' />
                            </div>
                            <div className='bg-gray-200 w-10 h-10 rounded-full place-content-center justify-items-center'>
                                <CgEditFlipV className='w-5 h-5' />
                            </div>
                            <div className='bg-gray-200 w-24 flex gap-3 h-10 rounded-full place-content-center justify-items-center'>
                                <div className='place-content-center'>
                                    <h1>
                                        90<span>&#176;</span>
                                    </h1>
                                </div>
                                <div className='place-content-center'>
                                    <MdRotateRight />
                                </div>
                            </div>
                            <div className='bg-gray-200 w-24 flex gap-3 h-10 rounded-full place-content-center justify-items-center'>
                                <div className='place-content-center'>
                                    <FaMinus />
                                </div>
                                <div className='place-content-center'>
                                    <h1>100</h1>
                                </div>
                                <div className='place-content-center'>
                                    <FaPlus />
                                </div>
                            </div>
                            <div className='bg-gray-200 w-10 h-10 rounded-full place-content-center justify-items-center'>
                                <MdPreview className='w-5 h-5' />
                            </div>
                            <div className='bg-gray-200 w-10 h-10 rounded-full place-content-center justify-items-center'>
                                <img src={preview} alt="" className='h-4 w-5' />
                            </div>
                            <div className='bg-gray-200 w-10 h-10 rounded-full place-content-center justify-items-center'>
                                <BsDownload className='w-5 h-5' />
                            </div>
                        </div>


                        <div className="grid grid-cols-1 justify-items-center sm:grid-cols-3 gap-4">
                            {pdfFiles.map((pdf) => (
                                <div
                                    key={pdf.id}
                                    className="w-44 h-72 p-1 bg-gray-100 shadow-md rounded-lg cursor-pointer flex flex-col items-center justify-between"
                                    onClick={() => handlePdfClick(pdf)}
                                >
                                    <div className="w-full mt-1 bg-gray-200 flex items-center justify-center rounded-md">
                                        {/* Display an image instead of text */}
                                        <img
                                            src={pdf.image} // Thumbnail image for the PDF
                                            alt="PDF Thumbnail"
                                            className="w-40 h-60"
                                        />
                                    </div>
                                    <div className="text-center flex gap-3">
                                        <img src={pdficon} alt="pdfIcon" className="w-3.5 h-4" />
                                        <h3 className="text-sm font-semibold text-gray-700">{pdf.name}</h3>
                                        <FiDownload />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>



                    {/* Display selected PDF */}
                    <div className="xl:w-1/2 border xl:rounded-tr-3xl  xl:rounded-br-3xl  ">

                        {selectedPdf ? (
                            <div className="flex flex-col items-center ">
                                <img
                                    src={selectedPdf.image} // Display selected PDF's image
                                    alt="Selected PDF Thumbnail"
                                    className="w-full h-full  shadow-lg"
                                />

                            </div>
                        ) : (
                            <p className='text-center'>Please select a PDF file to view its preview.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AttachedDocument;
