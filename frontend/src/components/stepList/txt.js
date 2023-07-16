
import React, { useRef } from 'react';
import { FaChevronCircleRight } from 'react-icons/fa';

import { delLine } from '../../services/canvas.service';
import { useDraw } from '../../store';

export default function Txt({ com }) {
  const btnRef = useRef({});

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
                <input
                  type='text'
                  className='flex mt-2 mb-2 items-center w-full focus:outline-blue-300 h-9 pl-3 bg-white rounded-sm'
                  value={element.content}
                  placeholder='This is a TextInput.'
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
    </>
  )

}