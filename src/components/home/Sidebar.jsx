import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import plus from '../../assets/icons/plus.png';
import copy from '../../assets/icons/copy.png';
import dots from '../../assets/icons/dots.png';
import dropdown from '../../assets/icons/dropdown.png';

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
}) => {
  const [sections, setSections] = useState(['addTemplate', 'addField', 'addInformation']);

  const renderDropdown = (label, value, options, onChange) => (
    <div className="w-full h-12 p-3 rounded-full mt-3">
      <select
        className="w-full border p-3 rounded-full bg-gray-300"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>{`Select ${label}`}</option>
        {options.map((item, index) => (
          <option value={item} key={index}>{item}</option>
        ))}
      </select>
    </div>
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sections}>
        <div className="lg:w-2/6 space-y-1">
          {sections.map((section) => {
            if (section === 'addTemplate') {
              return (
                <DraggableSection key={section} id={section}>
                  <div className="bg-white p-6 space-y-3 rounded-2xl">
                    <div className="flex gap-2 justify-between">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          updateTemplate('name', name);
                        }}
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
                        onChange={(e) => {
                          setMacro(e.target.value);
                          updateMacros(macro);
                        }}
                        required
                        placeholder="Add Macro"
                        className="border rounded-full font-poppins w-5/6 sm:w-11/12 lg:w-60 xl:w-80 px-2"
                      />
                      <span className="bg-[#516EFF] w-12 h-12 flex justify-center items-center rounded-full">
                        <img src={plus} alt="" className="w-3 h-3" />
                      </span>
                    </div>
                    <button
                      onClick={saveTemplate}
                      className="w-full bg-[#CBEA7B80] h-12 font-poppins rounded-full"
                    >
                      Save
                    </button>
                  </div>
                </DraggableSection>
              );
            } else if (section === 'addField') {
              return (
                <DraggableSection key={section} id={section}>
                  <div className="bg-white rounded-2xl p-3">
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
                      <div className="bg-[#CBEA7B] w-10 h-10 rounded-full flex justify-center items-center">
                        <img src={dots} alt="" className="w-1 h-4" />
                      </div>
                    </div>
                    <div className="w-full bg-gray-300 flex justify-between items-center h-12 p-3 rounded-full mt-3">
                      <h1 className="font-normal">Study type</h1>
                      <img src={dropdown} alt="" className="w-3 h-2" />
                    </div>
                  </div>
                </DraggableSection>
              );
            } else if (section === 'addInformation') {
              return (
                <DraggableSection key={section} id={section}>
                  <div className="p-3 bg-white rounded-2xl font-poppins ">
                    <div className="flex gap-2 justify-between">
                      <div className="flex gap-3">
                        <div className="w-11 h-11 bg-gray-200  rounded-full flex justify-center items-center">
                          <img src={copy} alt="" className="w-5 h-5" />
                        </div>
                        <div className="text-xs">
                          <h1 className="font-bold">Add Information</h1>
                          <p>Add information about the pet</p>
                        </div>
                      </div>
                      <div className="bg-[#CBEA7B] w-10 h-10 rounded-full flex justify-center items-center">
                        <img src={dots} alt="" className="w-1 h-4" />
                      </div>
                    </div>
                    {renderDropdown('Species', template.add_information.species, species, (e) => updateTemplate('species', e.target.value))}
                    {renderDropdown('Modality Type', template.add_information.modality_type, modality_type, (e) => updateTemplate('modality_type', e.target.value))}
                    {renderDropdown('Study Type', template.add_information.study_type, study_type, (e) => updateTemplate('study_type', e.target.value))}
                    {renderDropdown('User ID', template.add_information.user_id, user_Id, (e) => updateTemplate('user_id', e.target.value))}
                  </div>
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