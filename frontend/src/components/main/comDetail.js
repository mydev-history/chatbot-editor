import React from 'react';
import { FaWindowClose, FaPlusCircle, FaTrashAlt } from "react-icons/fa";

import { useHandlePopUp, useComponent } from "../../store";
import { addStep, editStep } from '../../services/step.service';
import { keyData } from '../../config/items';


function ComDatail() {
  const [load, setLoad] = React.useState(false);

  const sltCrtKey = useHandlePopUp(state => state.sltCrtKey);
  const sltCom = useComponent(state => state.sltCom);
  const allCom = useComponent(state => state.allCom);
  const handleSltCom = useComponent(state => state.handleSltCom);
  const handleAllCom = useComponent(state => state.handleAllCom);

  const changeText = (value, index) => {
    let comData = sltCom;
    comData.elements[index].content = value;
    handleSltCom(comData);
    setLoad(!load);
  }

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
  const addButton = () => {
    const selData = sltCom;
    selData.elements.push({ type: 'button', content: '', placeholder: 'Click to edit', isNext: true });
    handleSltCom(selData);
    setLoad(!load);
  }

  const delBtn = index => {
    const selData = sltCom;
    selData.elements.splice(index, 1);
    handleSltCom(selData);
    setLoad(!load);
  }

  return (
    <>
      <div className='flex flex-col z-10 min-w-[380px] min-h-screen max-h-screen bg-gray-200 absolute right-0 shadow-xl shadow-white overflow-y-auto pb-44 comdetail-scrollbar'>

        <div className='flex flex-row w-full h-20 border-b-2 z-20 bg-gray-200 border-gray-500 items-center p-4 fixed'>
          <div className='text-3xl text-pink-400'>
            {keyData[`${sltCom.key}`]['icon']}
          </div>
          <p className='text-2xl ml-4 font-bold text-gray-600'>
            {keyData[`${sltCom.key}`]['title']}
          </p>
          <button
            onClick={() => sltCrtKey('')}
            className='absolute top-7 text-2xl  left-[340px] text-gray-400 hover:text-gray-700 active:text-gray-900'
          >
            <FaWindowClose />
          </button>
        </div >

        <div className='mt-20'>
          {
            sltCom.elements.length &&
            sltCom.elements.map((element, index) => {
              return (
                <div key={index}>
                  {
                    element.header &&
                    <div className='p-3'>
                      {element.header}
                    </div>
                  }
                  {
                    element.type === "txt" &&
                    <div className='p-3 mt-[-16px]'>
                      <textarea
                        value={element.content}
                        className='w-full focus:outline-blue-300 h-32 p-2 resize-none border-2 border-gray-500 rounded-md'
                        onChange={(e) => changeText(e.target.value, index)}
                      />
                    </div>
                  }
                  {
                    element.type === "button" &&
                    <div className='flex flex-row w-10/12 mt-3 ml-8 bg-blue-400 justify-center border-blue-500 border-2 rounded-md'>
                      <input
                        className='w-4/5 p-2 bg-gray-600 focus:outline-none text-gray-200 font-semibold'
                        placeholder={`${element.placeholder}`}
                        value={element.content}
                        onChange={(e) => changeText(e.target.value, index)}
                      />
                      <div className='flex w-1/5 justify-center items-center bg-gray-600'>
                        <button
                          onClick={() => delBtn(index)}
                          className='text-gray-100 hover:text-gray-300 active:text-black'>
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  }
                  {
                    element.type === "addbutton" &&
                    <div className='bottom-16 min-w-[350px] text-white h-24 fixed ml-8 bg-gray-200 p-3'>
                      <button
                        onClick={addButton}
                        className='flex flex-row items-center bg-color1 hover:bg-color2 active:bg-gray-700 w-11/12 rounded-full hover:scale-105'
                      >
                        <FaPlusCircle className='text-5xl' />
                        <p className='text-xl ml-4'>
                          {element.content}
                        </p>
                      </button>
                    </div>
                  }
                </div>

              )
            })
          }
        </div>
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
      </div >

    </>
  );
}

export default ComDatail;
