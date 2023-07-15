
import { addStep, editStep } from '../../../services/step.service'

import { useComponent, useHandlePopUp } from '../../../store';

function SaveBtn() {

  const allCom = useComponent(state => state.allCom);
  const sltCom = useComponent(state => state.sltCom);
  const sltCrtKey = useHandlePopUp(state => state.sltCrtKey);

  const handleAllCom = useComponent(state => state.handleAllCom);

  const save = () => {
    let allData = allCom;
    let step = {};
    if (sltCom._id) {
      step._id = sltCom._id;
      step.x = sltCom.x;
      step.y = sltCom.y;
      step.key = sltCom.key;
      step.elements = sltCom.elements;
      editStep(step)
        .then(val => {
          let index = allData.findIndex(com => com._id === val._id);
          if (index !== -1) {
            allData.splice(index, 1, val);
            handleAllCom(allData)
            sltCrtKey('')
          }
          else {
            console.log("Not found")
          }
        })
    }
    else {
      step.x = 0;
      step.y = 0;
      step.key = sltCom.key;
      step.elements = sltCom.elements;
      addStep(step)
        .then(val => {
          allData.push(val);
          handleAllCom(allData);
          sltCrtKey('')
        })
    }

  }
  return (
    <>
      < div className="w-full h-20 bg-color1 bottom-0 fixed" >
        <button
          onClick={() => sltCrtKey('')}
          className='w-24 h-8 bg-gray-100 hover:bg-gray-300 active:bg-gray-500 fixed bottom-6 right-32 rounded-lg font-bold text-gray-600'
        >
          Cancel
        </button>

        <button onClick={save}
          className='w-24 h-8 bg-pink-600 hover:bg-pink-700 active:bg-pink-900 fixed bottom-6 right-4 rounded-lg font-bold text-white'
        >
          Save
        </button>
      </div >
    </>
  );
}

export default SaveBtn;
