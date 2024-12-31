import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import RTE from '../../components/RTE';
import Patient_Sidebar from './Patient_Sidebar';
import { BsViewStacked } from "react-icons/bs";
import { RiFilter2Line } from "react-icons/ri";
import dots from '../../assets/icons/dots.png';
import './Patient.css';
import { useLocation } from 'react-router-dom';
// DraggableSection component using useSortable hook for main sections
function DraggableSection({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
function Patient() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const location = useLocation();
  const rowData = location.state?.rowData; // Retrieve row data
  const [sections, setSections] = useState(['rte', 'sidebar']);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  console.log('Row Data:', rowData);
  
  const handleStartStopRecording = () => {
    setIsRecording((prevState) => !prevState);
  };
  const handleOnStop = (recordedBlob) => {
    console.log('Recorded Blob:', recordedBlob);
    setRecordedAudio(recordedBlob);
    // Process the audio blob here (e.g., send it to a speech-to-text API)
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
  return (
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections} strategy={horizontalListSortingStrategy}>
          <div className='flex flex-col lg:flex-row mt-6 gap-1'>
            {sections.map((section) => {
              if (section === 'rte') {
                return (
                  <div className='lg:w-4/6'>
                  <DraggableSection key={section} id={section}>
                    <div className=''>
                      <RTE name="editor" heightValue={800}  defaultValue="Initial content for Card 2" />
                    </div>
                  </DraggableSection>
                  </div>
                );
              } else if (section === 'sidebar') {
                return (
                  <div className='lg:w-2/6'>
                  <DraggableSection key={section} id={section}>
                    <Patient_Sidebar
                    rowData={rowData}
                     />
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



