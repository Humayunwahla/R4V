import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Dots from '../assets/icons/dots.png';

function RTE({ name, label, defaultValue = "", heightValue }) {
  const [value, setValue] = useState(defaultValue);

  const modules = {
    toolbar: [
      [{ 'font': [] }], // Font dropdown
      [{ 'size': ['small', false, 'large', 'huge'] }], // Font sizes
      ['bold', 'italic', 'underline', 'strike'], // Text styling
      [{ 'align': [] }], // Text alignment
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
      [{ 'indent': '-1' }, { 'indent': '+1' }], // Indentation
      [{ 'color': [] }, { 'background': [] }], // Text color & background color
      ['link', 'image'], // Media
      ['clean'], // Clear formatting
      ['undo', 'redo'], // Undo and Redo buttons
    ],
    history: {
      delay: 1000, // Time delay between changes to create history snapshot
      maxStack: 50, // Maximum undo stack size
      userOnly: true, // Tracks user edits only
    },
  };

  return (
    <div className='relative'>
      <div className="drag-handle bg-[#CBEA7B] w-8 h-8 rounded-full flex justify-center items-center absolute z-50 right-0 top-0 mt-1 mr-1">
        <img src={Dots} alt="" className="w-1 h-4" />
      </div>
      {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="mt-8 relative shadow-2xl rounded-lg overflow-hidden bg-white">
        <ReactQuill
          value={value}
          onChange={setValue}
          style={{ height: heightValue }}
          modules={modules}
        />
      </div>
    </div>
  );
}

export default RTE;