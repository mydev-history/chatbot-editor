import React from "react";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { useComponent } from "../../store";

export default function Btn() {

  const [load, setLoad] = React.useState(false);

  const sltCom = useComponent(state => state.sltCom);
  const handleSltCom = useComponent(state => state.handleSltCom);


  const addButton = () => {
    const selData = sltCom;
    selData.elements.push({ type: 'button', content: '', placeholder: 'Click to edit', isNext: true });
    handleSltCom(selData);
    setLoad(!load);
  }


  const changeText = (value, index) => {
    let comData = sltCom;
    comData.elements[index].content = value;
    handleSltCom(comData);
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
      <div className='flex flex-col overflow-y-auto p-1 comdetail-scrollbar'>
        {
          sltCom.elements.length &&
          sltCom.elements.map((element, index) => {
            return (
              <div key={index} className="flex flex-row w-full justify-center">
                {
                  element.type === "txt" &&
                  <div className='w-11/12 mt-2'>
                    <textarea
                      value={element.content}
                      className='w-full focus:outline-blue-300 h-32 p-2 resize-none border-2 border-gray-500 rounded-md'
                      onChange={(e) => changeText(e.target.value, index)}
                    />
                  </div>
                }
                {
                  element.type === "button" &&
                  <div className='flex flex-row w-10/12 mt-3 bg-blue-400 justify-center border-blue-500 border-2 rounded-md'>
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
              </div>
            )
          })
        }
        <div className="flex flex-row w-full justify-center">
          <button
            onClick={addButton}
            className='flex flex-row w-10/12 items-center bg-color1 hover:bg-color2 active:bg-gray-700 rounded-full hover:scale-105 mt-4'
          >
            <FaPlusCircle className='text-5xl text-gray-200' />
            <p className='text-xl ml-7 font-semibold text-gray-200'>
              Add another button
            </p>
          </button>
        </div>

      </div>
    </>
  )
}