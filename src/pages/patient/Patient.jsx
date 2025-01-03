import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import RTE from '../../components/RTE';
import Patient_Sidebar from './Patient_Sidebar';
import { BsViewStacked, BsStars } from "react-icons/bs";
import { RiFilter2Line } from "react-icons/ri";
import dots from '../../assets/icons/dots.png';
import './Patient.css';
import { useLocation } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ClipLoader } from 'react-spinners'; // Import ClipLoader from react-spinners

// Access your API key as an environment variable (see "Set up your API key" above)
const Api_key = "AIzaSyAYMIlZgtZf-j0584SHSzj-9mSG9Bhw59Q";
const genAI = new GoogleGenerativeAI(Api_key);

// DraggableSection component using useSortable hook for main sections
function DraggableSection({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {children(listeners)}
    </div>
  );
}

function Patient() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [transcript, setTranscript] = useState(''); // State to store the transcript
  const location = useLocation();
  const rowData = location.state?.rowData; // Retrieve row data
  const [sections, setSections] = useState(['rte', 'sidebar']);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleStartStopRecording = () => {
    setIsRecording((prevState) => !prevState);
  };

  const handleOnStop = (recordedBlob) => {
    console.log('Recorded Blob:', recordedBlob);
    setRecordedAudio(recordedBlob);
    // Process the audio blob here (e.g., send it to a speech-to-text API)
  };

  const handleTranscriptChange = (newTranscript) => {
    setTranscript(newTranscript); // Update the transcript state
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const fetchData = async (userPrompt) => {
    setLoading(true); // Start loading
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(userPrompt);
      const response = await result.response;
      const text = await response.text();
      setResponseText(formatResponse(text)); // Format the response text
      setTranscript(text); // Update the RTE component with the response
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleProcessWithAI = () => {
    fetchData(transcript);
  };

  // Function to format the response text
  const formatResponse = (text) => {
    const lines = text.split("\n");
    let inList = false;
    const formattedLines = lines.map((line) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        // Bold text
        return `<p><strong>${line.slice(2, -2)}</strong></p>`;
      } else if (line.startsWith("* ")) {
        // List item
        if (!inList) {
          inList = true;
          return `<ul><li>${line.slice(2)}</li>`;
        } else {
          return `<li>${line.slice(2)}</li>`;
        }
      } else {
        // Paragraph
        if (inList) {
          inList = false;
          return `</ul><p>${line}</p>`;
        } else {
          return `<p>${line}</p>`;
        }
      }
    });

    // Close any unclosed list
    if (inList) {
      formattedLines.push("</ul>");
    }

    return formattedLines.join(""); // Combine the formatted lines
  };

  return (
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections} strategy={horizontalListSortingStrategy}>
          <div className='flex flex-col lg:flex-row mt-6 gap-1'>
            {sections.map((section) => {
              if (section === 'rte') {
                return (
                  <div className='lg:w-4/6' key={section}>
                    <div className='flex justify-end'>
                      <button
                        className="border bg-[#CBEA7B80] p-2 rounded-full mt-2 flex items-center justify-center gap-1"
                        onClick={handleProcessWithAI}
                      >
                        Process with AI <span><BsStars color='black' /></span>
                      </button>
                    </div>
                    <DraggableSection id={section}>
                      {(listeners) => (
                        <div className='relative'>
                          <div className="drag-handle bg-[#CBEA7B] w-8 h-8 rounded-full flex justify-center items-center absolute z-50 right-0 top-0 mt-1 mr-1" {...listeners}>
                            <img src={dots} alt="" className="w-1 h-4" />
                          </div>
                          <div>
                            <RTE name="editor" heightValue={800} defaultValue={transcript || "default"} value={transcript} />
                            {loading && (
                              <div className="loading-overlay">
                                <ClipLoader color="#CBEA7B" loading={loading} size={50} />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </DraggableSection>
                  </div>
                );
              } else if (section === 'sidebar') {
                return (
                  <div className='lg:w-2/6' key={section}>
                    <DraggableSection id={section}>
                      {(listeners) => (
                        <div>
                          <Patient_Sidebar rowData={rowData} onTranscriptChange={handleTranscriptChange}/>
                        </div>
                      )}
                    </DraggableSection>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </SortableContext>
      </DndContext>
      {/**Button section */}
      <div className="space-x-3 gap-4 font-poppins mt-3">
        <button className="border bg-[#CBEA7B80] h-10 rounded-full px-3 mt-2">Save</button>
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
            <tr className='table-heading text-center'>
              <th className="border border-gray-300 p-2 rounded-tl-3xl">PID</th>
              <th className="border px-2 py-2 justify-items-center">
                <div className='flex gap-2'>
                  <p>Study Type</p>
                  <span className='bg-gray-200 w-6 h-6 rounded-full place-content-center justify-items-center'>
                    <RiFilter2Line />
                  </span>
                </div>
              </th>
              <th className="border px-2 py-2 justify-items-center">
                <div className='flex gap-2'>
                  <p>Acc#</p>
                  <span className='bg-gray-200 w-6 h-6 rounded-full place-content-center justify-items-center'>
                    <RiFilter2Line />
                  </span>
                </div>
              </th>
              <th className="border px-2 py-2 justify-items-center">
                <div className='flex gap-2'>
                  <p>Study Date</p>
                  <span className='bg-gray-200 w-6 h-6 rounded-full place-content-center justify-items-center'>
                    <RiFilter2Line />
                  </span>
                </div>
              </th>
              <th className="border px-2 py-2 justify-items-center">
                <div className='flex gap-2'>
                  <p>Ref Phys</p>
                  <span className='bg-gray-200 w-6 h-6 rounded-full place-content-center justify-items-center'>
                    <RiFilter2Line />
                  </span>
                </div>
              </th>
              <th className="border px-2 py-2 justify-items-center">
                <div className='flex gap-2'>
                  <p>Signed By</p>
                  <span className='bg-gray-200 w-6 h-6 rounded-full place-content-center justify-items-center'>
                    <RiFilter2Line />
                  </span>
                </div>
              </th>
              <th className="border px-2 py-2 justify-items-center">
                <div className='flex gap-2'>
                  <p>Attachments</p>
                  <span className='bg-gray-200 w-6 h-6 rounded-full place-content-center justify-items-center'>
                    <RiFilter2Line />
                  </span>
                </div>
              </th>
              <th className="border px-2 py-2 rounded-tr-3xl justify-items-center">
                <div className='flex gap-2'>
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
                  className="appearance-none border h-3 w-3 rounded-full border-gray-300 focus:ring-2 checked:ring-blue-500"
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
                  className="appearance-none border h-3 w-3 rounded-full border-gray-300 focus:ring-2 checked:ring-blue-500"
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
                  className="appearance-none border h-3 w-3 rounded-full border-gray-300 focus:ring-2 checked:ring-blue-500"
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
  );
}

export default Patient;