import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
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
import { createMacro, createTemplate, getCatalog, getTemplate, getMacro, updateTemplate, getSingleTemplate } from '../../utils/API_SERVICE';
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
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedCard, setSelectedCard] = useState(null);
  const [visibleRTE, setVisibleRTE] = useState([]);
  const [name, setName] = useState("");
  const [macro, setMacro] = useState("");
  const [macroData, setMacroData] = useState([]);
  const [species, setSpecies] = useState([]);
  const [modality_type, setModality_Type] = useState([]);
  const [study_type, setStudy_Type] = useState([]);
  const [user_Id, setUser_Id] = useState(["Ahmad123", "humayun21", "kashan123", "cat321"]);
  const [items, setItems] = useState(['editor', 'sidebar']);
  const [template, setTemplate] = useState({
    add_information: {
      name: "",
      species: '',
      modality_type: '',
      study_type: '',
      macros: [], // Store macros as an array
    },
  });
  const [draggingEnabled, setDraggingEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // State variables to store RTE content
  const [headerContent, setHeaderContent] = useState("");
  const [bodyContent, setBodyContent] = useState("");
  const [footerContent, setFooterContent] = useState("");
  const [macroContent, setMacroContent] = useState("");
  const [templateData, setTemplateData] = useState([]); // Store multiple template data
  const [templateId, setTemplateId] = useState(null); // State variable to store templateId
  const [singleFetchedTemplate, setSingleFetchedTemplate] = useState(null); // State variable to store fetched template

  const accessToken = useAuth();

  // Fetch all templates on component mount
  // Fetch dropdown data on component mount
  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const speciesResponse = await getCatalog({ catalogType: 1 }, accessToken);
        const modalityTypeResponse = await getCatalog({ catalogType: 2 }, accessToken);
        const studyTypeResponse = await getCatalog({ catalogType: 3 }, accessToken);

        if (speciesResponse.success) {
          setSpecies(speciesResponse.payload.catalogItems.map(item => item.name));
        }

        if (modalityTypeResponse.success) {
          setModality_Type(modalityTypeResponse.payload.catalogItems.map(item => ({
            modality_type_id: item.modality_id,
            name: item.name
          })));
        }

        if (studyTypeResponse.success) {
          setStudy_Type(studyTypeResponse.payload.catalogItems.map(item => ({
            study_type_id: item.study_type_id,
            name: item.name
          })));
          console.log("study type", study_type);
        }
      } catch (error) {
        console.error('Error fetching catalog data:', error);
      }
    };

    fetchCatalogs();
    fetchedMacro();
  }, [accessToken]);

  const fetchedMacro = async () => {
    try {
      const macroResponse = await getMacro({}, accessToken);
      if (macroResponse.success) {
        setMacroData(macroResponse.payload.map(macro => macro.macroName));
      }
    } catch (error) {
      console.error('Error fetching macro data:', error);
    }
  }

  const fetchTemplates = async () => {
    setLoading(true); // Set loading state to true before fetching templates
    try {
      const fetchedTemplates = await getTemplate({}, accessToken);
      if (fetchedTemplates && fetchedTemplates.payload) {
        const transformedData = await Promise.all(fetchedTemplates.payload.map(async (template) => {
          const speciesName = species[template.speciesId - 1] || 'N/A';
          const modalityTypeName = modality_type[template.modalityTypeId - 1] || 'N/A';
          const studyTypeName = study_type.find(type => type.study_type_id === template.studyTypeId)?.name || template.studyTypeId || 'N/A';
          const userId = user_Id.find(id => id === template.createdBy) || template.createdBy || 'N/A';

          let macroData = 'N/A';
          try {
            const fetchedMacro = await getMacro({ StudyTypeId: template.studyTypeId }, accessToken);
            if (fetchedMacro && fetchedMacro.payload.length > 0) {
              macroData = fetchedMacro.payload.map(macro => macro.macroName).join(', ');
              console.log(fetchedMacro);

            }
          } catch (error) {
            console.error('Error fetching macro:', error);
          }

          return {
            species: speciesName,
            modalityType: modalityTypeName,
            studyType: studyTypeName,
            userId: userId,
            macros: macroData,
            template: template.templateName,
            templateId: template.templateId // Store the templateId
          };
        }));

        setTemplateData(transformedData);
        console.log("Fetched Templates Data:", transformedData);
      } else {
        console.error('Failed to fetch templates data');
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false); // Set loading state to false after fetching templates
    }
  };

  useEffect(() => {
    if (species.length && modality_type.length && study_type.length) {
      fetchTemplates();
    }
  }, [accessToken, species, modality_type, study_type, user_Id]);

  const updateTemplateState = (key, value) => {
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
        macros: value,
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
        StudyTypeId: template.add_information.study_type?.study_type_id || 'a3f5d5f1-3a89-4c8b-8e91-0b28b6d6d1e0',
        Description: bodyContent,
        IsActive: true,
        Header: headerContent,
        Footer: footerContent,
      };
      console.log("Template Data>>>>>", templateData);

      const templateResponse = await createTemplate(templateData, accessToken);
      console.log('Template saved successfully!', templateResponse);

      if (templateResponse?.payload?.templateId) {
        const newTemplateId = templateResponse.payload.templateId;
        setTemplateId(newTemplateId); // Store templateId in state
        console.log('Template ID:', newTemplateId);

        // Fetch the newly created template
        await fetchTemplates();
      }

      alert('Template saved successfully!');

      if (template.add_information.macros.length > 0) {
        const existingMacros = await getMacro({}, accessToken);
        const existingMacroNames = existingMacros.payload.map(macro => macro.macroName);

        for (const macro of template.add_information.macros) {
          if (!existingMacroNames.includes(macro)) {
            const macroData = {
              MacroName: macro,
              SpeciesId: species.indexOf(template.add_information.species) + 1 || 1,
              ModalityTypeId: modality_type.indexOf(template.add_information.modality_type) + 1 || 1,
              StudyTypeId: template.add_information.study_type?.study_type_id || 'a3f5d5f1-3a89-4c8b-8e91-0b28b6d6d1e3',
            };

            const macroResponse = await createMacro(macroData, accessToken);
            console.log('Macro saved successfully!', macroResponse);
          } else {
            console.warn(`Macro with name "${macro}" already exists.`);
          }
        }
        alert('Macros saved successfully!');
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

  const handleRowClick = (row) => {
    navigate('/patient', { state: { rowData: row } });
  };

  const handleEditClick = async (row) => {
    console.log('Edit button clicked', row.templateId);
    try {
      const fetchedTemplate = await getSingleTemplate({ templateId: row.templateId }, accessToken);
      console.log('Fetched Template from table:', fetchedTemplate);
      if (fetchedTemplate && fetchedTemplate.payload) {
        const template = fetchedTemplate.payload;
        setTemplateId(template.templateId);
        setName(template.templateName);
        setHeaderContent(template.header);
        setBodyContent(template.body);
        setFooterContent(template.footer);
        updateTemplateState('species', species[template.speciesId - 1] || '');
        updateTemplateState('modality_type', modality_type.find(type => type.modality_type_id === template.modalityTypeId) || '');
        updateTemplateState('study_type', study_type.find(type => type.study_type_id === template.studyTypeId) || '');
        updateTemplateState('macros', template.macros || []);
        setSingleFetchedTemplate(template); // Store fetched template data in state
        setIsEditing(true); // Set the editing state to true
      }
    } catch (error) {
      console.error('Error fetching template:', error);
    }
  };

  const updateExistingTemplate = async () => {
    const contentObject = {
      header: headerContent,
      body: bodyContent,
      footer: footerContent,
    };

    const templateData = {
      TemplateName: template.add_information.name,
      Content: JSON.stringify(contentObject),
      SpeciesId: species.indexOf(template.add_information.species) + 1,
      ModalityTypeId: modality_type.find(type => type.name === template.add_information.modality_type)?.modality_type_id,
      StudyTypeId: template.add_information.study_type?.study_type_id,
      Description: bodyContent,
      IsActive: true,
    };

    console.log('Updated Template Data:', templateData);
    try {
      const response = await updateTemplate(templateData, accessToken);
      console.log('Template updated successfully!', response);
      alert('Template updated successfully!');
      // Optionally, you can refresh the template list or perform another action
      setIsEditing(false); // Set the editing state to false after updating
    } catch (error) {
      console.error('Failed to update template', error);
      alert('Failed to update template');
    }
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
            heading="Macro"
            paragraph="This is a sample paragraph."
            className=""
            radioValue={visibleRTE.includes(0)}
            onRadioChange={() => handleRadioChange(0)}
          />
        </div>
        <div onClick={() => handleCardClick(1)}>
          <Card
            heading="Template Content"
            paragraph="Another description for this card."
            className=""
            radioValue={visibleRTE.includes(1)}
            onRadioChange={() => handleRadioChange(1)}
          />
        </div>
        <div onClick={() => handleCardClick(2)}>
          <Card
            heading="Template Header"
            paragraph="Another description for this card."
            className=""
            radioValue={visibleRTE.includes(2)}
            onRadioChange={() => handleRadioChange(2)}
          />
        </div>
        <div onClick={() => handleCardClick(3)}>
          <Card
            heading="Template Footer"
            paragraph="Another description for this card."
            className=""
            radioValue={visibleRTE.includes(3)}
            onRadioChange={() => handleRadioChange(3)}
          />
        </div>
      </div>
      {/** Table section */}
      <TableSection
        tableData={templateData} // Pass the fetched templates data
        handleRowClick={handleRowClick}
        handleEditClick={handleEditClick}
        handleCardClick={handleCardClick}
        loading={loading} // Pass the loading state to TableSection
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
                                  value={value => setHeaderContent(value)}
                                  defaultValue="Initial content for Card 1"
                                  onFocus={handleFocus}
                                  onBlur={handleBlur}
                                  onChange={setMacroContent}
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
                                onChange={setHeaderContent}
                              />
                            </div>
                          )}
                          {visibleRTE.includes(3) && (
                            <div>
                              <RTE
                                name="editor"
                                heightValue={400}
                                defaultValue="Initial content for Card 4"
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
                            saveTemplate={isEditing ? updateExistingTemplate : saveTemplate}
                            updateTemplate={updateTemplateState}
                            updateMacros={updateMacros}
                            species={species}
                            modality_type={modality_type}
                            study_type={study_type}
                            user_Id={user_Id}
                            template={template}
                            macroData={macroData}
                            // singleFetchedTemplate={singleFetchedTemplate}
                            isEditing={isEditing} // Pass the isEditing state to the Sidebar
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