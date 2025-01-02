import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import mic from '../../assets/icons/mic.png';
import addphoto from '../../assets/icons/addphoto.png';
import deleted from '../../assets/icons/deleted.png';
import text from '../../assets/icons/text.png';
import micwhite from '../../assets/icons/mic-white.png';
import copy from '../../assets/icons/copy.png';
import filter from '../../assets/icons/filter.png';
import dots from '../../assets/icons/dots.png';
import dot from '../../assets/icons/dot.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './Patient.css';

function DraggableItem({ id, children }) {
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

function Patient_Sidebar({ rowData }) {
  const [templates, setTemplates] = useState([
    { id: 'template-1', text: 'Template name', details: 'Species: Bull Dog' },
    { id: 'template-2', text: 'Template name', details: 'Modality: MRI' },
    { id: 'template-3', text: 'Template name', details: 'Study: Chest' },
    { id: 'template-4', text: 'Template name', details: 'User ID: 3567s34244' }
  ]);
  const [macros, setMacros] = useState([
    { id: 'macro-1', text: 'Praesentium maxime minus quia dolorum mollitia magni sunt voluptate.' },
    { id: 'macro-2', text: 'Excepturi quia ipsum eum. Dolores ipsa dolor neque ut laborum.' },
    { id: 'macro-3', text: 'Eligendi impedit rerum rerum dolorum.' },
    { id: 'macro-4', text: 'Dolores ipsa dolor neque ut laborum.' }
  ]);
  const [sections, setSections] = useState(['reportAudio', 'templates', 'macros']);
  const [draggingEnabled, setDraggingEnabled] = useState(true);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [isRecording, setIsRecording] = useState(false);
  const macroDataFrom = rowData.macros.split(',');

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

  useEffect(() => {
    console.log("Transcript data:", transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleStartStopRecording = () => {
    if (isRecording) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
    setIsRecording((prevState) => !prevState);
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

  const handleFocus = () => setDraggingEnabled(false);
  const handleBlur = () => setDraggingEnabled(true);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sections}>
        <div className='space-y-1'>
          {sections.map((section) => {
            switch (section) {
              case 'reportAudio':
                return (
                  <DraggableSection key={section} id={section}>
                    {(listeners) => (
                      <div className='bg-white rounded-2xl p-3'>
                        <div className='flex gap-2 justify-between'>
                          <div className='flex gap-2'>
                            <div className='w-1/6'>
                              <div className='w-11 h-11 bg-gray-200 rounded-full place-content-center justify-items-center '>
                                <img src={mic} alt="" className='w-5 h-5' />
                              </div>
                            </div>
                            <div className=''>
                              <h1 className='font-bold'>Report Audio</h1>
                              <h1 className='macros-text'>Find your saved your templates here</h1>
                            </div>
                            <div className='flex gap-1'>
                              <div className='w-8 h-8 bg-gray-200 rounded-full place-content-center justify-items-center '>
                                <img src={addphoto} alt="" className='w-4 h-4' />
                              </div>
                              <div className='w-8 h-8 bg-gray-200 rounded-full place-content-center justify-items-center '>
                                <img src={text} alt="" className='w-4 h-4' />
                              </div>
                              <div className='w-8 h-8 bg-gray-200 rounded-full place-content-center justify-items-center '>
                                <img src={deleted} alt="" className='w-4 h-4' />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='w-full flex justify-between place-content-center items-center gap-1 p-5 mt-3'>
                          <div className='rounded-full place-content-center justify-items-center'>
                            <button
                              className={`mt-3 w-10 h-10 rounded-full ${isRecording ? 'bg-red-500' : 'bg-gray-200'} flex items-center justify-center`}
                              onClick={handleStartStopRecording}
                            >
                              <FontAwesomeIcon
                                icon={isRecording ? faPause : faPlay}
                                className="text-black w-4 h-4"
                              />
                            </button>
                          </div>
                        </div>
                        <div className='flex relative mb-9 mt-12'>
                          <div className='bg-[#CBEA7B] border-4 w-16 h-16 rounded-full place-content-center justify-items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                            <img src={micwhite} alt="" className='w-4 h-5' />
                          </div>
                          <div className='h-7 w-16 bg-[#EAEAEA] place-content-center justify-items-center rounded-full absolute right-4 flex items-center justify-center'>
                            <h1 className='text-xs font-semibold'>1:30 min</h1>
                          </div>
                        </div>
                        {transcript && (
                          <div className='mt-4'>
                            <h2 className='font-bold'>Transcription:</h2>
                            <p>{transcript}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </DraggableSection>
                );
              case 'templates':
                return (
                  <DraggableSection key={section} id={section}>
                    {(listeners) => (
                      <div className='bg-white rounded-2xl p-3'>
                        <div className='flex gap-2 justify-between'>
                          <div className='flex gap-2'>
                            <div className='w-11 h-11 bg-gray-200 rounded-full place-content-center justify-items-center '>
                              <img src={copy} alt="" className='w-5 h-5' />
                            </div>
                            <div className='text-xs'>
                              <h1 className='font-bold'>Templates</h1>
                              <h1 className='text-xs'>Find your saved your templates here</h1>
                            </div>
                          </div>
                          <div className='gap-1 flex'>
                            <div className='bg-[#EAEAEA] w-10 h-10 rounded-full place-content-center justify-items-center'>
                              <img src={filter} alt="" className='w-6 h-6 ' />
                            </div>
                            <div className='bg-[#CBEA7B] w-10 h-10 rounded-full place-content-center justify-items-center' {...listeners}>
                              <img src={dots} alt="" className='w-1 h-4 ' />
                            </div>
                          </div>
                        </div>
                        <div className='w-full bg-gray-300 items-center h-auto p-3 rounded-2xl mt-3'>
                          <div className='gap-2 flex'>
                            <div className='w-8 h-8 place-content-center justify-items-center bg-black rounded-full'>
                              <img src={dot} alt="" className='w-2 h-3' />
                            </div>
                            <h1 className='font-normal place-content-center'>{rowData.template}</h1>
                          </div>
                          <div className='gap-2 mt-2 flex flex-wrap'>
                            <div className='w-auto px-3 h-8 bg-white rounded-full p-2 text-xs place-content-center justify-items-center'>
                              <h1 className='template-subheading'>Species:{rowData.species}</h1>
                            </div>
                            <div className='w-auto px-3 h-8 bg-white rounded-full p-2 text-xs place-content-center justify-items-center'>
                              <h1 className='template-subheading'>Modality: {rowData.modalityType.name}</h1>
                            </div>
                            <div className='w-auto px-3 h-8 bg-white rounded-full p-2 text-xs place-content-center justify-items-center'>
                              <h1 className='template-subheading'>Study: {rowData.studyType}</h1>
                            </div>
                            <div className='w-auto px-3 h-8 bg-white rounded-full text-xs place-content-center justify-items-center'>
                              <h1 className='template-subheading'>User ID: {rowData.userId}</h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </DraggableSection>
                );
              case 'macros':
                return (
                  <DraggableSection key={section} id={section}>
                    {(listeners) => (
                      <div className="p-3 bg-white rounded-2xl">
                        <div className="flex gap-2 justify-between">
                          <div className="flex gap-2">
                            <div className="w-11 h-11 bg-gray-200 rounded-full place-content-center justify-items-center">
                              <img src={copy} alt="" className="w-5 h-5" />
                            </div>
                            <div className="text-xs">
                              <h1 className="font-bold">Macros</h1>
                              <h1 className="text-xs">Find your saved Macros here</h1>
                            </div>
                          </div>
                          <div className="gap-1 flex">
                            <div className="bg-[#EAEAEA] w-10 h-10 rounded-full place-content-center justify-items-center">
                              <img src={filter} alt="" className="w-6 h-6" />
                            </div>
                            <div className="bg-[#CBEA7B] w-10 h-10 rounded-full place-content-center justify-items-center"{...listeners}>
                              <img src={dots} alt="" className="w-1 h-4" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1 blur-overlay blur-bottom macros-height overflow-scroll custom-scrollbar">
                          {macroDataFrom.map((macro, index) => (
                            <div key={index} className='w-full flex gap-2 bg-gray-300 place-content-center items-center h-auto p-3 rounded-2xl mt-3'>
                              <div className='w-8 h-8 place-content-center justify-items-center bg-black rounded-full'>
                                <img src={dot} alt="" className='w-2 h-3' />
                              </div>
                              <div className='w-11/12'>
                                <h1 className='macros-text'>{macro}</h1>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </DraggableSection>
                );
              default:
                return null;
            }
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default Patient_Sidebar;