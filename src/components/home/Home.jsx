import React, { useState, useEffect } from 'react';
import arrow from '../../assets/icons/arrow.png';
import Card from './Card';
import RTE from '../RTE';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Sidebar from './Sidebar';
import TableSection from './Tablesection';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove, useSortable, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createMacro, createTemplate, getTemplate } from '../../utils/API_SERVICE';
import { useAuth } from '../../Hooks/useAuth';
import dots from '../../assets/icons/dots.png';

function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {props.children(listeners)}
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
  const [templateData, setTemplateData] = useState([]); // Store multiple template data
  const [templateId, setTemplateId] = useState(null); // State variable to store templateId

  const accessToken = useAuth();

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
    };
    try {
      const templateData = {
        TemplateName: template.add_information.name || 'Sample2',
        Content: JSON.stringify(contentObject),
        SpeciesId: species.indexOf(template.add_information.species) + 1 || 1,
        ModalityTypeId: modality_type.indexOf(template.add_information.modality_type) + 1 || 1,
        StudyTypeId: 'a3f5d5f1-3a89-4c8b-8e91-0b28b6d6d1e3',
        Description: 'This is a sample template description for demonstration purposes.',
        IsActive: true,
        Header: "header content",
        Footer: "footer content",
      };

      const templateResponse = await createTemplate(templateData, accessToken);
      console.log('Template saved successfully!', templateResponse);

      if (templateResponse?.payload?.templateId) {
        const newTemplateId = templateResponse.payload.templateId;
        setTemplateId(newTemplateId); // Store templateId in state
        console.log('Template ID:', newTemplateId);

        // Fetch the newly created template
        const fetchedTemplate = await getTemplate({ TemplateId: newTemplateId }, accessToken);
        if (fetchedTemplate && fetchedTemplate.payload) {
          // Transform fetched template data to match the tableData structure
          const transformedData = {
            species: species[fetchedTemplate.payload.speciesId - 1],
            modalityType: modality_type[fetchedTemplate.payload.modalityTypeId - 1],
            studyType: study_type.find(type => type === fetchedTemplate.payload.studyTypeId) || fetchedTemplate.payload.studyTypeId,
            userId: user_Id.find(id => id === fetchedTemplate.payload.createdBy) || fetchedTemplate.payload.createdBy,
            macros: 'N/A', // Assuming macros are not part of the fetched template
            template: fetchedTemplate.payload.templateName,
          };
          setTemplateData((prev) => [...prev, transformedData]); // Store transformed template data
          console.log("Fetched Template Data:", fetchedTemplate);
        } else {
          console.error('Failed to fetch template data');
        }
      }

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

  // Log template data to debug
  console.log('Template Data:', templateData);

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
        tableData={templateData} // Pass the fetched templates data
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
                  <div className='lg:w-4/6' key={id}>
                    <SortableItem id={id}>
                      {(listeners) => (
                        <div className=''>
                          {visibleRTE.includes(0) && (
                            <div className='relative'>
                              <div className="drag-handle bg-[#CBEA7B] w-8 h-8 rounded-full flex justify-center items-center absolute z-50 right-0 top-0 mt-1 mr-1" {...listeners}>
                                <img src={dots} alt="" className="w-1 h-4" />
                              </div>
                              <div>
                                <RTE
                                  name="editor"
                                  heightValue={400}
                                  defaultValue="Initial content for Card 1"
                                  onFocus={handleFocus}
                                  onBlur={handleBlur}
                                  onChange={setHeaderContent}
                                />
                              </div>
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
                                onChange={setBodyContent}
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
                                onChange={setFooterContent}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </SortableItem>
                  </div>
                );
              } else if (id === 'sidebar') {
                return (
                  <div className='lg:w-2/6' key={id}>
                    <SortableItem id={id}>
                      {(listeners) => (
                        <div>
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
                      )}
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