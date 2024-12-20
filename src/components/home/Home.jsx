import React, { useState } from 'react';
import arrow from '../../assets/icons/arrow.png';
import Card from './Card';
import RTE from '../RTE';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Draggable from 'react-draggable';
import { tableData } from '../../constants/GeneralData';
import Sidebar from './Sidebar';
import TableSection from './Tablesection';

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
      <TableSection
        tableData={tableData}
        handleRowClick={handleRowClick}
        handleEditClick={handleEditClick}
        handleCardClick={handleCardClick}
      />

      {/* add dragable content here */}
      <div>
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
          <Sidebar
            name={name}
            setName={setName}
            macro={macro}
            setMacro={setMacro}
            saveTemplate={saveTemplate}
            updateTemplate={updateTemplate}
            updateMacros={updateMacros}
            species={species}
            modality_type={modality_type}
            study_type={study_type}
            user_Id={user_Id}
            template={template}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
