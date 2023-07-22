import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { FaTrash } from 'react-icons/fa';
import { editStep, delStep } from '../../services/step.service';
import { addLine, delLines, replaceLine } from '../../services/canvas.service';

import { keyData } from '../../config/items';

import { useHandlePopUp, useComponent, useDraw } from '../../store';

import StepList from '../../config/stepList';

export default function Step({
  com,
  index,
}) {
  const btnRef = useRef({});

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showDelStep, setShowDelStep] = useState(false);

  const sltCom = useComponent(state => state.sltCom)
  const allCom = useComponent(state => state.allCom);
  const startPoint = useDraw(state => state.startPoint);
  const allLines = useDraw(state => state.allLines);
  const sltCrtKey = useHandlePopUp(state => state.sltCrtKey);
  const handleSltCom = useComponent(state => state.handleSltCom);
  const handleAllCom = useComponent(state => state.handleAllCom);
  const showCom = useComponent(state => state.showCom);
  const setSP = useDraw(state => state.setSP);
  const setEP = useDraw(state => state.setEP);
  const setSPId = useDraw(state => state.setSPId);
  const sPId = useDraw(state => state.sPId);
  const setAllLines = useDraw(state => state.setAllLines);

  const handleDrag = (e) => {
    const x = e.movementX;
    const y = e.movementY;
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

    let allLinesData = allLines.map(line => line);
    allLinesData.forEach(line => {
      if (line.ep_id === sltCom._id) {
        line.e_pos.x = position.x - 10;
        line.e_pos.y = position.y + 22;
      }
      if (line.sp_id.includes(sltCom._id)) {
        const btnRect = btnRef.current[line.sp_id];
        const bounds = btnRect.getBoundingClientRect();
        // setSP({ x: bounds.left + 10, y: bounds.top + 10 });
        line.s_pos.x = bounds.left + 10;
        line.s_pos.y = bounds.top + 10;
      }
    });
    setAllLines(allLinesData);
    setPosition({
      x: position.x + x,
      y: position.y + y,
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
      });
    delLines(id)
      .then(val => {
        let allLinesData = allLines.filter(line => line.ep_id !== id);
        allLinesData = allLinesData.filter(line => !line.sp_id.includes(id));
        setAllLines(allLinesData);
      })
      .catch(err => {
        console.log(err);
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
    let allLinesData = allLines.map(line => line);
    allLinesData.forEach(line => {
      if (line.ep_id === sltCom._id) {
        line.e_pos.x = position.x - 10;
        line.e_pos.y = position.y + 22;
        replaceLine(line)
          .catch(err => {
            console.log(err)
          })
      }
      if (line.sp_id.includes(sltCom._id)) {
        const btnRect = btnRef.current[line.sp_id];
        const bounds = btnRect.getBoundingClientRect();
        // setSP({ x: bounds.left + 10, y: bounds.top + 10 });
        line.s_pos.x = bounds.left + 10;
        line.s_pos.y = bounds.top + 10;
        replaceLine(line)
          .catch(err => {
            console.log(err)
          })
      }
      setAllLines(allLinesData);
    });
  }



  const endPS = (id, pos, key) => {
    if (id !== sPId.split('-')[0] && sPId) {
      setEP(pos);
      addLine({ sp_id: sPId, ep_id: id, s_pos: startPoint, e_pos: pos })
        .then(val => {
          const allLinesData = allLines;
          console.log(allLinesData)
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
            onDoubleClick={showCom}
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
          <StepList com={com} btnRef={btnRef} />
        </div>
      </Draggable >
    </>
  )
    ;
}