import React, { useEffect } from 'react';

import Start from './components/main/start';
import PopUp from './components/main/popUp';
import Canvas from './components/main/canvas';
import Step from './components/main/step';

import DrawButton from './components/basic/drawButton';

import { useHandlePopUp, useComponent, useDraw } from './store';
import { getSteps } from './services/step.service';
//Create Components
import ComDatail from './components/main/comDetail';

function App() {

  const crtKey = useHandlePopUp(state => state.crtKey);
  const allCom = useComponent(state => state.allCom);
  const handleAllCom = useComponent(state => state.handleAllCom);
  const isDrawing = useDraw(state => state.isDrawing);

  useEffect(() => {
    // (async () => {
    //   const allSteps = await getSteps();
    //   handleAllCom(allSteps);
    // })();
    getSteps()
      .then(val => {
        handleAllCom(val);
      })
  }, [])
  return (
    <>
      <div className="w-full min-h-screen bg-gray-700" style={{ backgroundImage: "url('./grid.png')" }}>
        <Canvas />
        <Start />
        <PopUp />
        {isDrawing && <DrawButton />}
        {(crtKey !== "" && !isDrawing) && <ComDatail />}
        {/* <div className='w-[1200px] ml-64 grid grid-cols-5 p-8 gap-3'> */}
        {
          allCom.length > 0 &&
          allCom.map((com, index) => {
            return (
              <Step
                key={com._id}
                com={com}
                index={index}
              />
            )

          })
        }

        {/* </div> */}
      </div >
    </>
  );
}

export default App;
