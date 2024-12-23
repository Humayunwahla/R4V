import React, { useState } from 'react';
import arrow from '../../assets/icons/arrow.png';
import Card from './Card';
import RTE from '../RTE';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import { tableData } from '../../constants/GeneralData';
import Sidebar from './Sidebar';
import TableSection from './Tablesection';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  );
}
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
  const [items, setItems] = useState(['editor', 'sidebar']);
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
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.indexOf(active.id);
        const newIndex = prevItems.indexOf(over.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  };
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
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          <div className='flex flex-col lg:flex-row mt-6 gap-1'>
            {items.map((id) => {
              if (id === 'editor') {
                return (
                  <div className='lg:w-4/6'>
                    <SortableItem key={id} id={id}>
                      <div className=''>
                        {visibleRTE.includes(0) && (
                          <div>
                            <RTE name="editor" heightValue={400} defaultValue="Initial content for Card 1" />
                          </div>
                        )}
                        {visibleRTE.includes(1) && (
                          <div>
                            <RTE name="editor" heightValue={400} defaultValue="Initial content for Card 2" />
                          </div>
                        )}
                        {visibleRTE.includes(2) && (
                          <div>
                            <RTE name="editor" heightValue={400} defaultValue="Initial content for Card 3" />
                          </div>
                        )}
                      </div>
                    </SortableItem>
                  </div>
                )
              } else if (id === 'sidebar') {
                return (
                  <div className='lg:w-2/6'>
                    <SortableItem key={id} id={id}>
                      <div >
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
                    </SortableItem>
                  </div>
                )
              } 
              return null;
            })}
          </div>
        </SortableContext>
      </DndContext>
      <Footer />
    </div>
  );
}
export default Home;
