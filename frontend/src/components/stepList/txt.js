
import React from 'react';
import { FaChevronCircleRight } from 'react-icons/fa';

import { delLine } from '../../services/canvas.service';
import { useDraw } from '../../store';

export default function Txt({ com, btnRef }) {

  const isDrawing = useDraw(state => state.isDrawing);
  const allLines = useDraw(state => state.allLines);

  const setSP = useDraw(state => state.setSP);
  const setSPId = useDraw(state => state.setSPId);
  const sPId = useDraw(state => state.sPId);
  const setAllLines = useDraw(state => state.setAllLines);

  const startPS = (id) => {
    if (isDrawing) {
      const btnRect = btnRef.current[id];
      const bounds = btnRect.getBoundingClientRect();
      setSP({ x: bounds.left + 10, y: bounds.top + 10 });
      setSPId(id);
    }
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
      {
        com.elements.length > 0 &&
        com.elements.map((element, index) => {
          return (
            <div className='relative pl-3 pr-3' key={index}>
              {
                element.type === "txt" &&
                <div
                  className='flex mt-2 mb-2 items-center w-full break-words break-all shadow-md focus:outline-blue-300 px-3 py-2 bg-white rounded-md'
                >{element.content}</div>
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
    </>
  )

}