import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { FaChevronCircleRight, FaTrash } from 'react-icons/fa';
import { editStep, delStep } from '../../services/step.service';
import { addLine, delLine } from '../../services/canvas.service';

import { keyData } from '../../config/items';

import { useHandlePopUp, useComponent, useDraw } from '../../store';

export default function Step({
  com,
  index,
}) {
  const btnRef = useRef({});
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [showDelStep, setShowDelStep] = useState(false)


  const sltCrtKey = useHandlePopUp(state => state.sltCrtKey);
  const sltCom = useComponent(state => state.sltCom)
  const allCom = useComponent(state => state.allCom);
  const handleSltCom = useComponent(state => state.handleSltCom);
  const handleAllCom = useComponent(state => state.handleAllCom);
  const isDrawing = useDraw(state => state.isDrawing);
  const startPoint = useDraw(state => state.startPoint);
  const allLines = useDraw(state => state.allLines);

  const setSP = useDraw(state => state.setSP);
  const setEP = useDraw(state => state.setEP);
  const setSPId = useDraw(state => state.setSPId);
  const sPId = useDraw(state => state.sPId);
  const setAllLines = useDraw(state => state.setAllLines);


  const handleDrag = (e) => {
    let allData = allCom;
    let comData = sltCom;
    comData.x = position.x;
    comData.y = position.y;
    let index = allData.findIndex(com => com._id === comData._id);
    if (index !== -1) {
      allData.splice(index, 1, comData);
      handleAllCom(allData);
      handleSltCom(comData);
    }
    setPosition({
      x: position.x + e.movementX,
      y: position.y + e.movementY,
    });
  };

  const handleDragStart = (e, com) => {
    setPosition({
      x: com.x,
      y: com.y
    });
    handleSltCom(com)
  }

  const delSelStep = (e, id) => {
    e.stopPropagation();
    delStep(id)
      .then(val => {
        const allData = allCom;
        const leftData = allData.filter(step => step._id !== val._id);
        handleAllCom(leftData);
      })
  }

  const handleDragEnd = (e, com) => {
    let allData = allCom;
    let comData = com;
    comData.x = position.x;
    comData.y = position.y;
    if (position.x < 0) comData.x = 0;
    if (position.y < 0) comData.y = 0;
    editStep(comData)
      .then(val => {
        let index = allData.findIndex(com => com._id === val._id);
        if (index !== -1) {
          allData.splice(index, 1, val);
          handleAllCom(allData);
          handleSltCom(comData);
          setPosition({
            x: val.x,
            y: val.y
          })
        }
        else {
          console.log("Not found");
        }
      })
    // if (com._id !== sPId.split('-')[0] && sPId) {
    //   endPS(com._id, { x: com.x, y: com.y + 22 });
    // }
  }

  const startPS = (id) => {
    if (isDrawing) {
      const btnRect = btnRef.current[id];
      const bounds = btnRect.getBoundingClientRect();
      setSP({ x: bounds.left + 10, y: bounds.top + 10 });
      setSPId(id);
    }
  }

  const endPS = (id, pos, key) => {
    if (id !== sPId.split('-')[0] && sPId) {
      setEP(pos);
      addLine({ sp_id: sPId, ep_id: id, s_pos: startPoint, e_pos: pos })
        .then(val => {
          const allLinesData = allLines;
          let sIndex = allLinesData.findIndex(line => line.sp_id === val.sp_id);
          if (sIndex >= 0) {
            allLinesData.splice(sIndex, 1, val);
          }
          else {
            allLinesData.push(val);
          }
          setAllLines(allLinesData);
          setSP({});
          setEP({});
          setSPId('');
        })
    }
    sltCrtKey(key);
  }

  const del = (id) => {
    if (isDrawing) {
      delLine(id)
        .then(val => {
          const allLinesData = allLines;
          const leftLinesData = allLinesData.filter(line => line._id !== val._id);
          setAllLines(leftLinesData);
          setSP({});
          setSPId('');
        })
    }
  }
  return (
    <>
      <Draggable
        key={index}
        position={{ x: com.x, y: com.y }}
        onStart={(e) => handleDragStart(e, com)}
        onStop={(e) => handleDragEnd(e, com)}
        onDrag={handleDrag}
      >
        <div className={`flex flex-col ${sltCom && sltCom._id === com._id ? 'z-10' : ''} w-52 bg-gray-300 rounded-lg shadow-md shadow-white absolute`}>
          <button
            onClick={() => endPS(com._id, { x: com.x - 10, y: com.y + 22 }, com.key)}
            onMouseEnter={() => setShowDelStep(true)}
            onMouseLeave={() => setShowDelStep(false)}
            className='flex flex-row justify-start items-center bg-gray-100 h-10 rounded-t-lg pl-3'
          >
            <div className='text-xl text-blue-500 mr-2'>
              {keyData[`${com.key}`]["icon"]}
            </div>
            <div className='font-semibold'>
              {keyData[`${com.key}`]["title"]}
            </div>
            <div
              onClick={(e) => delSelStep(e, com._id)}
              className={`${showDelStep ? '' : 'hidden'} absolute right-4 bg-gray-300 p-2 text-sm rounded-full text-red-600 hover:bg-gray-400 active:bg-gray-600 active:text-red-400`}
            >
              <FaTrash />
            </div>
          </button>
          {
            com.elements.length > 0 &&
            com.elements.map((element, index) => {
              return (
                <div className='relative pl-3 pr-3' key={index}>
                  {
                    element.type === "txt" &&
                    <input
                      type='text'
                      className='flex mt-2 mb-2 items-center w-full focus:outline-blue-300 h-9 pl-3 bg-white rounded-sm'
                      value={element.content}
                      placeholder='This is a TextInput.'
                      onChange={() => console.log("Value can be only changed on EditPanel")} />
                  }
                  {
                    element.type === "button" &&
                    <input
                      type='text'
                      className='flex shadow-md text-gray-100 shadow-blue-800 mt-2 mb-2 items-center w-full focus:outline-blue-300 h-9 pl-3 bg-forceblue rounded-sm '
                      value={element.content}
                      placeholder='This is a Button.'
                      onChange={() => console.log("Value can be only changed on EditPanel")} />
                  }
                  {element.isNext &&
                    <div>
                      <button
                        ref={el => btnRef.current[`${com._id}-${index}`] = el}
                        onClick={() => startPS(`${com._id}-${index}`)}
                        onDoubleClick={() => del(`${com._id}-${index}`)}
                        className={`absolute top-[18px] right-0 text-lightblue active:text-green-800 hover:scale-125 ${sPId === `${com._id}-${index}` ? 'animate-ping' : ''}`}
                      >
                        <FaChevronCircleRight />
                      </button>
                    </div>
                  }
                </div>
              )
            })
          }
        </div>
      </Draggable >
    </>
  )
    ;
}