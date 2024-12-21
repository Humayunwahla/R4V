import React, { useState } from 'react';
import Footer from '../../components/footer/Footer';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfimage from '../../assets/icons/pdfimage.png';
import pdficon from '../../assets/icons/pdficon.png';
import { FiDownload } from "react-icons/fi";
import pdf from '../../assets/pdf/Ev_Charging_Station_Finder.pdf';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

// // Set workerSrc to a valid CDN or local path
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

function AttachedDocument() {
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [error, setError] = useState(null);

    const pdfFiles = [
        { id: 1, name: 'Ev_Charging_Station_Finder.pdf', file: require('../../assets/pdf/Ev_Charging_Station_Finder.pdf') },
    ];


    const handlePdfClick = (pdf) => {
        setSelectedPdf(pdf);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setError(null); // Reset error on successful load
    };

    const onDocumentLoadError = (error) => {
        setError("Failed to load PDF");
        console.error(error);
    };

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div className="mt-6">
                <div className="flex flex-col xl:flex-row">
                    <div className="xl:w-1/2 p-4 bg-white border xl:rounded-tl-3xl xl:rounded-bl-3xl overflow-scroll">
                        <div className="grid grid-cols-1 justify-items-center sm:grid-cols-3 gap-4">
                            {pdfFiles.map((pdf) => (
                                <div
                                    key={pdf.id}
                                    className="w-44 h-72 p-1 bg-gray-100 shadow-md rounded-lg cursor-pointer flex flex-col items-center justify-between"
                                    onClick={() => handlePdfClick(pdf)}
                                >
                                    <div className="w-full mt-1 bg-gray-200 flex items-center justify-center rounded-md">
                                        <img
                                            src={pdfimage}
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

                    <div className="xl:w-1/2 border xl:rounded-tr-3xl xl:rounded-br-3xl">
                        {selectedPdf ? (
                            <div className="flex flex-col items-center h-screen overflow-y-auto p-4">
                                {error && <p className="text-red-500">{error}</p>}
                                <Viewer fileUrl={selectedPdf.file} />
                            </div>
                        ) : (
                            <p className="text-center">Please select a PDF file to view its preview.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </Worker>
    );
}

export default AttachedDocument;
