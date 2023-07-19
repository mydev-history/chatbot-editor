import { useState, useEffect, useRef } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import Draggable from 'react-draggable';

import { useDraw } from '../../store';
import { getLines } from '../../services/canvas.service';

export default function Canvas() {

  const startPoint = useDraw(state => state.startPoint);
  const endPoint = useDraw(state => state.endPoint);
  const allLines = useDraw(state => state.allLines);

  const setAllLines = useDraw(state => state.setAllLines);


  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const canvasRef = useRef();
  let ctx = null;

  useEffect(() => {
    getLines()
      .then(val => setAllLines(val))
      .catch(err => {
        console.log("error")
      })
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = windowSize.width;
    canvas.height = windowSize.height;

    // additional canvas setup or manipulations can be done here
    ctx = canvas.getContext("2d");
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowSize, startPoint, endPoint, allLines]);

  useEffect(() => {
    if (allLines.length) {
      allLines.map((line, index) => {
        completeLine({ x: line.s_pos.x, y: line.s_pos.y, x1: line.e_pos.x, y1: line.e_pos.y });
      })
    }
  }, [windowSize, startPoint, endPoint, allLines]);

  const drawLine = (info, style = {}) => {
    const { x, y, x1, y1 } = info;
    const { color = '#4fccc2', width = 4 } = style;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }
  const completeLine = (info) => {
    const { x, y, x1, y1 } = info;
    if (x1 >= x) {
      drawLine({ x: x, y: y, x1: (x + x1) / 2 + 2, y1: y });
      drawLine({ x: (x + x1) / 2, y: y, x1: (x + x1) / 2, y1: y1 });
      drawLine({ x: (x + x1) / 2 - 2, y: y1, x1: x1, y1: y1 });
    }
    else {
      drawLine({ x: x, y: y, x1: (x + 20) + 2, y1: y });
      drawLine({ x: x + 20, y: y, x1: x + 20, y1: (y + y1) / 2 });
      drawLine({ x: x + 20 + 2, y: (y + y1) / 2, x1: (x1 - 20) - 2, y1: (y + y1) / 2 });
      drawLine({ x: (x1 - 20), y: (y + y1) / 2, x1: (x1 - 20), y1: y1 });
      drawLine({ x: (x1 - 20) - 2, y: y1, x1: x1, y1: y1 });
    }
  }

  return (
    <>
      <div className='absolute'>
        <canvas ref={canvasRef} />
      </div>{
        allLines.length ? (
          allLines.map((line, index) => {
            return (
              <Draggable
                key={line._id}
                position={{ x: line.e_pos.x - 8, y: line.e_pos.y - 10 }}
              >
                <div className='absolute text-xl text-lightblue'>
                  <FaAngleDoubleRight />
                </div>
              </Draggable>
            )

          })
        ) : (
          <div className='absolute text-xl text-lightblue'>

          </div>
        )
      }
      {/* <Draggable position={{ x: endPoint.x - 8, y: endPoint.y - 10 }}>
        <div className='absolute text-xl text-lightblue'><FaAngleDoubleRight /></div>
      </Draggable> */}
    </>
  );
}