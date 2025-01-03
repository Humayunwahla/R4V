import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import plus from '../../assets/icons/plus.png';
import copy from '../../assets/icons/copy.png';
import dots from '../../assets/icons/dots.png';
import dropdown from '../../assets/icons/dropdown.png';
import dot from '../../assets/icons/dot.png';

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

const Sidebar = ({
  name,
  setName,
  macro,
  setMacro,
  saveTemplate,
  updateTemplate,
  updateMacros,
  species,
  modality_type,
  study_type,
  user_Id,
  template,
  macroData,
  singleFetchedTemplate, // Add this prop to receive the fetched template data
  isEditing // Add isEditing state to determine if we are editing or creating a new template
}) => {
  const [sections, setSections] = useState(['addTemplate', 'addField', 'addInformation']);
  const [draggingEnabled, setDraggingEnabled] = useState(true);
  const [macros, setMacros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // Add saving state

  // Update the state variables when the fetched template data changes
  useEffect(() => {
    if (singleFetchedTemplate) {
      setName(singleFetchedTemplate.templateName);
      setMacros(singleFetchedTemplate.macros || []);
      updateTemplate('species', species[singleFetchedTemplate.speciesId - 1] || '');
      updateTemplate('modality_type', modality_type.find(type => type.modality_type_id === singleFetchedTemplate.modalityTypeId) || '');
      updateTemplate('study_type', study_type.find(type => type.study_type_id === singleFetchedTemplate.studyTypeId) || '');
    }
  }, [singleFetchedTemplate, species, modality_type, study_type, updateTemplate]);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false); // Set loading to false after data is fetched
    }, 2000);
  }, []);

  const renderDropdown = (label, value, options, onChange) => (
    <div className="w-full h-12 p-3 rounded-full mt-3 mb-5">
      <select
        className="w-full border p-3 rounded-full bg-gray-300"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>{`Select ${label}`}</option>
        {options.map((item) => (
          <option value={item.study_type_id || item.modality_type_id || item} key={item.study_type_id || item.modality_type_id || item}>
            {item.name || item}
          </option>
        ))}
      </select>
    </div>
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: draggingEnabled ? 5 : Infinity, // Disable dragging when not enabled
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleFocus = () => setDraggingEnabled(false);
  const handleBlur = () => setDraggingEnabled(true);

  const addMacro = () => {
    if (macro.trim()) {
      const newMacros = [...macros, macro.trim()];
      setMacros(newMacros);
      setMacro('');
      updateMacros(newMacros); // Update the template macros
    }
  };

  const removeMacro = (index) => {
    const newMacros = macros.filter((_, i) => i !== index);
    setMacros(newMacros);
    updateMacros(newMacros); // Update the template macros
  };

  const handleSaveTemplate = async () => {
    setSaving(true); // Set saving state to true
    await saveTemplate();
    setSaving(false); // Set saving state to false
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sections}>
        <div className="space-y-1">
          {sections.map((section) => {
            if (section === 'addTemplate') {
              return (
                <DraggableSection key={section} id={section}>
                  {(listeners) => (
                    <div className="bg-white p-6 space-y-3 rounded-2xl">
                      {loading ? (
                        <>
                          <Skeleton height={40} />
                          <Skeleton height={40} />
                          <Skeleton height={40} />
                        </>
                      ) : (
                        <>
                          <div className="flex gap-2 justify-between">
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                                updateTemplate('name', e.target.value);
                              }}
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                              required
                              placeholder="Add new template"
                              className="border font-poppins rounded-full w-5/6 sm:w-11/12 lg:w-60 xl:w-80 px-2"
                            />
                            <span className="bg-[#516EFF] w-12 h-12 flex justify-center items-center rounded-full">
                              <img src={plus} alt="" className="w-3 h-3" />
                            </span>
                          </div>
                          <div className="flex gap-2 justify-between">
                            <input
                              type="text"
                              value={macro}
                              onChange={(e) => setMacro(e.target.value)}
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                              required
                              placeholder="Add Macro"
                              className="border rounded-full font-poppins w-5/6 sm:w-11/12 lg:w-60 xl:w-80 px-2"
                            />
                            <span
                              className="bg-[#516EFF] w-12 h-12 flex justify-center items-center rounded-full"
                              onClick={addMacro}
                            >
                              <img src={plus} alt="" className="w-3 h-3" />
                            </span>
                          </div>
                          <div>
                            {macros.map((macro, index) => (
                              <div key={index} className="flex justify-between border my-2 bg-gray-300 place-content-center items-center h-auto p-3 rounded-2xl mt-3">
                                <div className='w-8 h-8 place-content-center justify-items-center bg-black rounded-full'>
                                  <img src={dot} alt="" className='w-2 h-3' />
                                </div>
                                <div className='w-11/12'>
                                  <h1 className='macros-text'>{macro}</h1>
                                </div>
                                <button
                                  className="text-red-500"
                                  onClick={() => removeMacro(index)}
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={handleSaveTemplate}
                            className="w-full bg-[#CBEA7B80] h-12 font-poppins rounded-full flex items-center justify-center"
                            disabled={saving} // Disable button when saving
                          >
                            {saving ? (
                              <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                                <span className="sr-only">Loading...</span>
                              </div>
                            ) : (
                              isEditing ? 'Update' : 'Save' // Change button text based on isEditing state
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </DraggableSection>
              );
            } else if (section === 'addField') {
              return (
                <DraggableSection key={section} id={section}>
                  {(listeners) => (
                    <div className="bg-white rounded-2xl p-3">
                      {loading ? (
                        <Skeleton height={150} />
                      ) : (
                        <>
                          <div className="flex gap-2 justify-between">
                            <div className="flex gap-2">
                              <div className="w-11 h-11 bg-gray-200 rounded-full flex justify-center items-center">
                                <img src={copy} alt="" className="w-5 h-5" />
                              </div>
                              <div className="text-xs">
                                <h1 className="font-bold">Add fields</h1>
                                <p>Select the fields from the table below</p>
                              </div>
                            </div>
                            <div className="bg-[#CBEA7B] w-10 h-10 rounded-full flex justify-center items-center" {...listeners}>
                              <img src={dots} alt="" className="w-1 h-4" />
                            </div>
                          </div>
                          <div className="relative space-y-1 blur-overlay blur-bottom macros-height overflow-hidden custom-scrollbar">
                            <div className="overflow-y-scroll h-96"> {/* Adjust the height as necessary */}
                              {macroData.map((macro, index) => (
                                <div key={index} className="w-full flex gap-2 bg-gray-300 place-content-center items-center h-auto p-3 rounded-2xl mt-3">
                                  <div className="w-8 h-8 place-content-center justify-items-center bg-black rounded-full">
                                    <img src={dot} alt="" className="w-2 h-3" />
                                  </div>
                                  <div className="w-11/12">
                                    <h1 className="text-[#828282] text-md">{macro}</h1>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </DraggableSection>
              );
            } else if (section === 'addInformation') {
              return (
                <DraggableSection key={section} id={section}>
                  {(listeners) => (
                    <div className="p-3 bg-white rounded-2xl font-poppins">
                      {loading ? (
                        <Skeleton height={150} />
                      ) : (
                        <>
                          <div className="flex gap-2 justify-between">
                            <div className="flex gap-3">
                              <div className="w-11 h-11 bg-gray-200 rounded-full flex justify-center items-center">
                                <img src={copy} alt="" className="w-5 h-5" />
                              </div>
                              <div className="text-xs">
                                <h1 className="font-bold">Add Information</h1>
                                <p>Add information about the pet</p>
                              </div>
                            </div>
                            <div className="bg-[#CBEA7B] w-10 h-10 rounded-full flex justify-center items-center" {...listeners}>
                              <img src={dots} alt="" className="w-1 h-4" />
                            </div>
                          </div>
                          {renderDropdown('Species', template.add_information.species, species, (e) => updateTemplate('species', e.target.value))}
                          {renderDropdown('Modality Type', template.add_information?.modality_type?.modality_type_id || '', modality_type, (e) => {
                            const selectedModalityType = modality_type.find(mt => mt.modality_type_id === parseInt(e.target.value, 10));
                            updateTemplate('modality_type', selectedModalityType);
                            console.log("modality", selectedModalityType)
                          })}
                          {renderDropdown('Study Type', template.add_information.study_type?.study_type_id || '', study_type, (e) => {
                            const selectedStudyType = study_type.find(st => st.study_type_id === e.target.value);
                            updateTemplate('study_type', selectedStudyType);
                            console.log("selectedStudyType", selectedStudyType);
                          })}
                          {renderDropdown('User ID', template.add_information.user_id, user_Id, (e) => updateTemplate('user_id', e.target.value))}
                        </>
                      )}
                    </div>
                  )}
                </DraggableSection>
              );
            }
            return null;
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Sidebar;