
import React, { useRef } from 'react';
import { FaChevronCircleRight } from 'react-icons/fa';

import { delLine } from '../../services/canvas.service';
import { useDraw } from '../../store';

export default function Media({ com }) {
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
      <div className='relative p-2'>
        {
          com.elements[0].type === "upload" &&
          <img
            src={`http://localhost:5000/${com.elements[0].content}`}
            alt="uploaded"
            className="w-full h-48 border-[10px] border-white"
          />

        }
        {
          com.elements[0].type === "url" &&
          <img
            src={com.elements[0].content}
            alt='url'
            className="w-full h-48 border-[10px] border-white" />
        }
        {com.elements[0].isNext &&
          <div>
            <button
              ref={el => btnRef.current[`${com._id}-0`] = el}
              onClick={() => startPS(`${com._id}-0`)}
              onDoubleClick={() => del(`${com._id}-0`)}
              className={`absolute top-[18px] right-0 text-lightblue active:text-green-800 hover:scale-125 ${sPId === `${com._id}-0` ? 'animate-ping' : ''}`}
            >
              <FaChevronCircleRight />
            </button>
          </div>
        }
      </div>
    </>
  )

}