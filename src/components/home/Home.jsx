import React, { useState } from 'react';
import arrow from '../../assets/icons/arrow.png';
import Card from './Card';
import filter from '../../assets/icons/filter.png';
import RTE from '../RTE';
import plus from '../../assets/icons/plus.png';
import copy from '../../assets/icons/copy.png';
import dots from '../../assets/icons/dots.png';
import dropdown from '../../assets/icons/dropdown.png';
import dot from '../../assets/icons/dot.png';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Draggable from 'react-draggable';
import { tableData } from '../../constants/GeneralData';

function Home() {
  const navigate = useNavigate();

  const [selectedCard, setSelectedCard] = useState(null);
  const [visibleRTE, setVisibleRTE] = useState([]);
  const [name, setName] = useState("");
  const [macro, setMacro] = useState("");
  const [species, setSpecies] = useState(["American Robin", "Golden Retriever", "Siamese Cat"]);
  const [modality_type, setModality_Type] = useState(["CT Scan", "MRI Scan", "Ultrasound Scan"]);
  const [study_type, setStudy_Type] = useState(["Chestnut Robin", "Golden Paws Retriever", "Siamese Claws Cat"]);
  const [user_Id, setUser_Id] = useState(["Ahmad123", "humayun21", "kashan123"]);

  const [template, setTemplate] = useState({
    template_id: '',
    add_information: {
      name: "",
      species: '',
      modality_type: '',
      study_type: '',
      user_id: '',
      macros: {},
    },
  });

  const updateTemplate = (key, value) => {
    setTemplate((prev) => ({
      ...prev,
      add_information: {
        ...prev.add_information,
        [key]: value,
      },
    }));
  };

  const updateMacros = (value) => {
    setTemplate((prev) => ({
      ...prev,
      add_information: {
        ...prev.add_information,
        macros: {
          value
        }
      },
    }));
  };

  const saveTemplate = async () => {
    console.log('Saving Template:', template);

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(template), // Send the template object as the request body
    });

    if (response.ok) {
      console.log('Template saved successfully!');
      alert('Template saved successfully!');
    } else {
      console.error('Failed to save template');
      alert('Failed to save template');
    }
  };

  const handleCardClick = (index) => {
    console.log(`Card ${index} clicked`);

    // Add the index to the visibleRTE array if it's not already there
    setVisibleRTE((prev) => {
      if (prev.includes(index)) {
        // If the card is already selected, remove it
        return prev.filter((i) => i !== index);
      } else {
        // If the card is not selected, add it to the array
        return [...prev, index];
      }
    });

    setSelectedCard((prev) => (prev === index ? null : index));
    console.log(selectedCard);
  };

  const handleRadioChange = (index) => {
    setVisibleRTE((prev) => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleRowClick = () => {
    navigate('/patient');
  };

  const handleEditClick = () => {
    console.log('Edit button clicked');
  }

  return (
    <div className='overflow-hidden z-50'>
      <div className='flex gap-3'>
        <div className='bg-gray-200 h-10 w-10 rounded-full justify-items-center place-content-center'>
          <img src={arrow} alt="" className='h-4 w-4 ' />
        </div>
        <h1 className=' text-3xl font-bold'>Create Template</h1>
      </div>
      {/**Card section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 mt-4 gap-3">
        <div onClick={() => handleCardClick(0)}>
          <Card
            heading="Header"
            paragraph="This is a sample paragraph."
            className=""
            radioValue={visibleRTE.includes(0)}
            onRadioChange={() => handleRadioChange(0)}
          />
        </div>
        <div onClick={() => handleCardClick(1)}>
          <Card
            heading="Body"
            paragraph="Another description for this card."
            className=""
            radioValue={visibleRTE.includes(1)}
            onRadioChange={() => handleRadioChange(1)}
          />
        </div>
        <div onClick={() => handleCardClick(2)}>
          <Card
            heading="Footer"
            paragraph="Another description for this card."
            className=""
            radioValue={visibleRTE.includes(2)}
            onRadioChange={() => handleRadioChange(2)}
          />
        </div>
        <div onClick={() => handleCardClick(3)}>
          <Card
            heading="Macros"
            paragraph="Another description for this card."
            className=""
          />
        </div>
      </div>

      {/** Table section */}
      <div className="mt-8 overflow-scroll">
        <table className="table-auto border bg-white min-w-full text-left">
          <thead className="text-sm">
            <tr>
              <th className="border px-2 py-2 min-w-[150px]">
                <div className="flex gap-2 items-center">
                  <p>Species</p>
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex justify-center items-center">
                    <img src={filter} alt="" className="w-3 h-3" />
                  </span>
                </div>
              </th>
              <th className="border px-2 py-2 min-w-[200px]">
                <div className="flex gap-2 items-center">
                  <p>Modality Type</p>
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex justify-center items-center">
                    <img src={filter} alt="" className="w-3 h-3" />
                  </span>
                </div>
              </th>
              <th className="border px-2 py-2 min-w-[150px]">
                <div className="flex gap-2 items-center">
                  <p>Study Type</p>
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex justify-center items-center">
                    <img src={filter} alt="" className="w-3 h-3" />
                  </span>
                </div>
              </th>
              <th className="border px-2 py-2 min-w-[150px]">
                <div className="flex gap-2 items-center">
                  <p>User ID’s</p>
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex justify-center items-center">
                    <img src={filter} alt="" className="w-3 h-3" />
                  </span>
                </div>
              </th>
              <th className="border px-2 py-2 min-w-[320px]">
                <div className="flex gap-2 items-center">
                  <p>Macros</p>
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex justify-center items-center">
                    <img src={filter} alt="" className="w-3 h-3" />
                  </span>
                </div>
              </th>
              <th className="border px-2 py-2 min-w-[150px]">
                <div className="flex gap-2 items-center">
                  <p>Templates</p>
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex justify-center items-center">
                    <img src={filter} alt="" className="w-3 h-3" />
                  </span>
                </div>
              </th>
              <th className="border px-2 py-2 min-w-[120px]">
                <div className="flex gap-2 items-center">
                  <p>Edits</p>
                  <span className="bg-gray-200 w-6 h-6 rounded-full flex justify-center items-center">
                    <img src={filter} alt="" className="w-3 h-3" />
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {tableData.map((row, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:bg-gray-100"
                onClick={handleRowClick} // Trigger navigation on row click
              >
                <td className="border border-gray-300 px-4 py-2 font-dmSans">{row.species}</td>
                <td className="border border-gray-300 px-4 py-2 font-dmSans">{row.modalityType}</td>
                <td className="border border-gray-300 px-4 py-2 font-dmSans">{row.studyType}</td>
                <td className="border border-gray-300 px-4 py-2 font-dmSans">{row.userId}</td>
                <td className="border border-gray-300 px-4 py-2 font-dmSans">{row.macros}</td>
                <td className="border border-gray-300 px-4 py-2 font-dmSans">{row.template}</td>
                <td className="border border-gray-300 px-4 py-2 font-dmSans">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the row click handler
                      handleEditClick(row); // Handle the edit button click
                      handleCardClick(0);   // Call handleCardClick for index 0
                      handleCardClick(1);   // Call handleCardClick for index 1
                      handleCardClick(2);   // Call handleCardClick for index 2
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}


          </tbody>
        </table>
      </div>

      <div className='flex flex-col lg:flex-row mt-6 gap-1'>
        {/**Editor section */}
        <div className='lg:w-4/6'>
          {visibleRTE.includes(0) && (
            <Draggable bounds="parent">
              <div>
                <RTE name="editor" heightValue={400} defaultValue="Initial content for Card 1" />
              </div>
            </Draggable>
          )}
          {visibleRTE.includes(1) && (
            <Draggable bounds="parent">
              <div>
                <RTE name="editor" heightValue={400} defaultValue="Initial content for Card 2" />
              </div>
            </Draggable>
          )}
          {visibleRTE.includes(2) && (
            <Draggable bounds="parent">
              <div>
                <RTE name="editor" heightValue={400} defaultValue="Initial content for Card 3" />
              </div>
            </Draggable>
          )}
        </div>

        {/**Side bar section */}
        <div className='lg:w-2/6 space-y-1'>
          {/**Add new template section */}
          <div className='bg-white p-6 space-y-3 rounded-2xl'>
            <div className='flex gap-2 justify-between'>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value); // Update local name state
                  updateTemplate('name', name); // Update template state
                }}
                required
                placeholder='Add new template'
                className='border font-poppins rounded-full w-5/6 sm:w-11/12 lg:w-60 xl:w-80 px-2'
              />
              <span className='bg-[#516EFF] w-12 h-12 place-content-center justify-items-center rounded-full'>
                <img src={plus} alt="" className='w-3 h-3 ' />
              </span>
            </div>
            <div className='flex gap-2 justify-between'>
              <input
                type="text"
                value={macro}
                onChange={(e) => {
                  setMacro(e.target.value); // Update local name state
                  updateMacros(macro); // Update template state
                }}
                required
                placeholder='Add Macro'
                className='border rounded-full font-poppins w-5/6 sm:w-11/12 lg:w-60 xl:w-80 px-2'
              />
              <span className='bg-[#516EFF] w-12 h-12 place-content-center justify-items-center rounded-full'>
                <img src={plus} alt="" className='w-3 h-3 ' />
              </span>
            </div>
            <div>
              <button onClick={saveTemplate} className='w-full bg-[#CBEA7B80] h-12 font-poppins rounded-full'>Save</button>
            </div>
          </div>

          {/**Add field section */}
          <div className='bg-white rounded-2xl p-3'>
            <div className='flex gap-2 justify-between'>
              <div className='flex gap-2'>
                <div className='w-11 h-11 bg-gray-200 rounded-full place-content-center justify-items-center'>
                  <img src={copy} alt="" className='w-5 h-5' />
                </div>
                <div className='text-xs'>
                  <h1 className='font-bold'>Add fields</h1>
                  <h1 className='text-xs'>Select the fields from the table below</h1>
                </div>
              </div>
              <div className='bg-[#CBEA7B] w-10 h-10 rounded-full place-content-center justify-items-center'>
                <img src={dots} alt="" className='w-1 h-4 ' />
              </div>
            </div>
            <div className='w-full bg-gray-300 flex justify-between items-center h-12 p-3 rounded-full mt-3'>
              <h1 className='font-normal'>Study type</h1>
              <img src={dropdown} alt="" className='w-3 h-2' />
            </div>

            <div className='border rounded-xl mt-3 p-6 space-y-2 h-60'>
              <div className='flex gap-2'>
                <div className='w-6 h-6 rounded-full bg-black place-content-center justify-items-center'>
                  <img src={dot} alt="" className='w-1.5 h-2.5' />
                </div>
                <div>
                  <p>Chestnut Robin</p>
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='w-6 h-6 rounded-full bg-black place-content-center justify-items-center'>
                  <img src={dot} alt="" className='w-1.5 h-2.5' />
                </div>
                <div>
                  <p>Golden Paws Retriever</p>
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='w-6 h-6 rounded-full bg-black place-content-center justify-items-center'>
                  <img src={dot} alt="" className='w-1.5 h-2.5' />
                </div>
                <div>
                  <p>Siamese Claws Cat</p>
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='w-6 h-6 rounded-full bg-black place-content-center justify-items-center'>
                  <img src={dot} alt="" className='w-1.5 h-2.5' />
                </div>
                <div>
                  <p>Bald Wings Eagle</p>
                </div>
              </div>
            </div>
          </div>

          {/**Add Information Section */}
          <div className="p-3 bg-white rounded-2xl font-poppins">
            <div className="flex gap-2 justify-between">
              <div className="flex gap-3">
                <div className="w-11 h-11 bg-gray-200 rounded-full flex justify-center items-center">
                  <img src={copy} alt="" className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <h1 className="font-bold">Add Information</h1>
                  <h1>Add information about the pet</h1>
                </div>
              </div>
              <div className="bg-[#CBEA7B] w-10 h-10 rounded-full flex justify-center items-center">
                <img src={dots} alt="" className="w-1 h-4" />
              </div>
            </div>

            {/* Species Dropdown */}
            <div className="w-full h-12 p-3 rounded-full mt-3">
              <select
                className="w-full border p-3 rounded-full bg-gray-300"
                value={template.add_information.species}
                onChange={(e) => updateTemplate('species', e.target.value)}
              >
                <option value="" disabled>Select Species</option>
                {species.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select>
            </div>

            {/* Modality Type Dropdown */}
            <div className="w-full h-12 p-3 rounded-full mt-3">
              <select
                className="w-full border p-3 rounded-full bg-gray-300"
                value={template.add_information.modality_type}
                onChange={(e) => updateTemplate('modality_type', e.target.value)}
              >
                <option value="" disabled>Select Modality Type</option>
                {modality_type.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select>
            </div>

            {/* Study Type Dropdown */}
            <div className="w-full h-12 p-3 rounded-full mt-3">
              <select
                className="w-full border p-3 rounded-full bg-gray-300"
                value={template.add_information.study_type}
                onChange={(e) => updateTemplate('study_type', e.target.value)}
              >
                <option value="" disabled>Select Study Type</option>
                {study_type.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select>
            </div>

            {/* User ID Dropdown */}
            <div className="w-full h-12 p-3 rounded-full mt-3 mb-4">
              <select
                className="w-full border p-3 rounded-full bg-gray-300"
                value={template.add_information.user_id}
                onChange={(e) => updateTemplate('user_id', e.target.value)}
              >
                <option value="" disabled>Select User ID</option>
                {user_Id.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Home