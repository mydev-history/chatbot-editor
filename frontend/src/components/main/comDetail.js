import React from 'react';
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";

import ComHeader from '../basic/comDetail/comHeader';
import SaveBtn from '../basic/comDetail/saveBtn';

import { useComponent } from "../../store";

function ComDetail() {
  const [load, setLoad] = React.useState(false);

  const sltCom = useComponent(state => state.sltCom);
  const handleSltCom = useComponent(state => state.handleSltCom);

  const changeText = (value, index) => {
    let comData = sltCom;
    comData.elements[index].content = value;
    handleSltCom(comData);
    setLoad(!load);
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
        <ComHeader />


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
        <SaveBtn />
      </div >

    </>
  );
}

export default ComDetail;
