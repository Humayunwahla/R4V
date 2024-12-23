import React, { useState } from 'react';
import arrow from '../../assets/icons/arrow.png';
import Card from './Card';
import RTE from '../RTE';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import { tableData } from '../../constants/GeneralData';
import Sidebar from './Sidebar';
import TableSection from './Tablesection';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove, useSortable, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createMacro, createTemplate } from '../../utils/API_SERVICE';
import { useAuth } from '../../Hooks/useAuth';

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
  const [user_Id, setUser_Id] = useState(["Ahmad123", "humayun21", "kashan123", "cat321"]);
  const [items, setItems] = useState(['editor', 'sidebar']);
  const [template, setTemplate] = useState({
    add_information: {
      name: "",
      species: '',
      modality_type: '',
      study_type: '',
    },
  });
  const [draggingEnabled, setDraggingEnabled] = useState(true);

  // State variables to store RTE content
  const [headerContent, setHeaderContent] = useState("");
  const [bodyContent, setBodyContent] = useState("");
  const [footerContent, setFooterContent] = useState("");

  const accessToken = useAuth();

  console.log("TOKEN FROM HOME", accessToken);
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
    const contentObject = {
      header: headerContent,
      body: bodyContent,
      footer: footerContent,
    }
    try {
      const templateData = {
        TemplateName: template.add_information.name || 'Sample2',
        Content: JSON.stringify(contentObject),
        SpeciesId: species.indexOf(template.add_information.species) + 1 || 1,
        ModalityTypeId: modality_type.indexOf(template.add_information.modality_type) + 1 || 1,
        StudyTypeId: 'a3f5d5f1-3a89-4c8b-8e91-0b28b6d6d1e3',
        Description: 'This is a sample template description for demonstration purposes.',
        IsActive: true,
      };

      console.log('Validated Template Data:', JSON.stringify(templateData, null, 2));

      const templateResponse = await createTemplate(templateData, accessToken);
      console.log('Template saved successfully!', templateResponse);
      alert('Template saved successfully!');

      if (template.add_information.macros && Object.keys(template.add_information.macros).length > 0) {
        const macroResponse = await createMacro(template.add_information.macros, accessToken);
        console.log('Macro saved successfully!', macroResponse);
        alert('Macro saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save template or macro', error);
      alert('Failed to save template or macro');
    }
  };

  const handleCardClick = (index) => {
    console.log(`Card ${index} clicked`);
    setVisibleRTE((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
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
  };

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

  const handleFocus = () => setDraggingEnabled(false);
  const handleBlur = () => setDraggingEnabled(true);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: draggingEnabled ? 5 : Infinity,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className='overflow-hidden z-50'>
      <div className='flex gap-3'>
        <div className='bg-gray-200 h-10 w-10 rounded-full justify-items-center place-content-center'>
          <img src={arrow} alt="" className='h-4 w-4 ' />
        </div>
        <h1 className=' text-3xl font-bold'>Create Template</h1>
      </div>
      {/** Card section */}
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
      {/* Add draggable content here */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
                            <RTE
                              name="editor"
                              heightValue={400}
                              defaultValue="Initial content for Card 1"
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                              onChange={setHeaderContent} // Capture header content
                            />
                          </div>
                        )}
                        {visibleRTE.includes(1) && (
                          <div>
                            <RTE
                              name="editor"
                              heightValue={400}
                              defaultValue="Initial content for Card 2"
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                              onChange={setBodyContent} // Capture body content
                            />
                          </div>
                        )}
                        {visibleRTE.includes(2) && (
                          <div>
                            <RTE
                              name="editor"
                              heightValue={400}
                              defaultValue="Initial content for Card 3"
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                              onChange={setFooterContent} // Capture footer content
                            />
                          </div>
                        )}
                      </div>
                    </SortableItem>
                  </div>
                );
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
                );
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