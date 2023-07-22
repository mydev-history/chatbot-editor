import React, { useEffect } from 'react';

import Start from './components/main/start';
import PopUp from './components/main/popUp';
import Canvas from './components/main/canvas';
import Step from './components/main/step';
import TestPanel from './components/main/testPanel';
import VariablePanel from './components/main/variablePanel';

import DrawButton from './components/basic/drawButton';

import { useHandlePopUp, useComponent, useDraw } from './store';
import { getSteps } from './services/step.service';
//Create Components
import ComDetail from './components/main/comDetail';

function App() {

  const crtKey = useHandlePopUp(state => state.crtKey);
  const allCom = useComponent(state => state.allCom);
  const isShowCom = useComponent(state => state.isShowCom);
  const isDrawing = useDraw(state => state.isDrawing);

  const handleAllCom = useComponent(state => state.handleAllCom);
  useEffect(() => {
    getSteps()
      .then(val => {
        handleAllCom(val);
      })
      .catch(err => {
        console.log("error");
      })
  }, [])
  return (
    <>
      <div className="w-full min-h-screen  bg-gray-700 overflow-auto"
        style={{ backgroundImage: "url('./grid.png')" }}>
        <VariablePanel />
        <TestPanel />
        <Canvas />
        <Start />
        <PopUp />
        {isDrawing && <DrawButton />}
        {(isShowCom && !isDrawing) && <ComDetail />}
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

      </div >
    </>
  );
}

export default App;
