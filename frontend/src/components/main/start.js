import React, { useState } from 'react';
import { FaFlagCheckered } from "react-icons/fa";

import { useHandlePopUp, useDraw } from "../../store";

import { delLine } from '../../services/canvas.service';

function Start() {
  const [showDrdw, setShowDrdw] = useState(false)

  const isDrawing = useDraw(state => state.isDrawing);
  const allLines = useDraw(state => state.allLines);
  const sPId = useDraw(state => state.sPId);

  const showPopUp = useHandlePopUp(state => state.showPopUp);
  const enableDraw = useDraw(state => state.enableDraw);
  const setSP = useDraw(state => state.setSP);
  const setSPId = useDraw(state => state.setSPId);
  const setAllLines = useDraw(state => state.setAllLines);

  const createNewStep = () => {
    showPopUp();
    setShowDrdw(!showDrdw)
  }
  const toggleDropDownOrStart = () => {
    if (!isDrawing) {
      setShowDrdw(!showDrdw);
    }
    else {
      setSP({ x: 160, y: 250 });
      setSPId('start');
    }
  }

  const delStartLine = () => {
    if (isDrawing) {
      delLine('start')
        .then(val => {
          const allLinesData = allLines;
          const leftLinesData = allLinesData.filter(line => line._id !== val._id);
          setAllLines(leftLinesData);
          setSP({});
          setSPId('');
        })
    }
  }

  const drawStart = () => {
    enableDraw();
    setShowDrdw(!showDrdw);
  }

  return (
    <>
      <div>
        <button
          onClick={toggleDropDownOrStart}
          onDoubleClick={delStartLine}
          className={`${sPId === 'start' ? 'animate-pulse' : ''} flex flex-row bg-blue-300 w-36 h-20 p-2 absolute top-52 left-5 rounded text-center justify-center hover:bg-blue-500 active:bg-blue-700 shadow-md shadow-blue-400 items-center hover:scale-110`}
        >
          <div className="flex flex-col mr-2">
            <div className="flex flex-row justify-center items-center text-md font-bold text-gray-600 gap-2">
              <FaFlagCheckered color="black" />
              Start Point
            </div>
            <div className="text-sm text-gray-100">
              Create steps and Draw lines
            </div>
          </div>
          {/* <button className='absolute top-4 right-0 text-green-500 active:text-green-800'>
            <FaPlusCircle />
          </button> */}
        </button>
        <div className={`absolute ${showDrdw ? '' : 'hidden'} top-72 left-5 w-36 h-20 bg-gray-600 mt-2 rounded-md p-1`}>
          <div className="flex flex-col mt-[3px] text-bold text-gray-200 text-sm">
            <button
              onClick={createNewStep}
              className="rounded-full hover:bg-gray-400 hover:text-white border p-1"
            >
              <p className="hover:scale-105">NEW STEP</p>
            </button>
            <button
              onClick={drawStart}
              className="rounded-full hover:bg-gray-400 hover:text-white border p-1 mt-1"
            >
              <p className="hover:scale-105">
                DRAW LINE
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Start;
