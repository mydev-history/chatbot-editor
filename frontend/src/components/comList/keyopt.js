import React from "react";
import { useComponent } from "../../store";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
export default function Keyopt() {
  const [load, setLoad] = React.useState(false);

  const sltCom = useComponent(state => state.sltCom);
  const handleSltCom = useComponent(state => state.handleSltCom);
  console.log(sltCom);

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
  return (
    <>
      <div className='flex flex-col overflow-y-auto p-1 comdetail-scrollbar'>
        {sltCom.elements.length &&
          sltCom.elements.map((element, index) => {
            return (
              <div key={index}>
                {
                  element.type === "txt" &&
                  <>
                    <div className='p-3'>
                      Question text
                    </div>
                    {
                      <div className='p-3 mt-[-16px]'>
                        <textarea
                          value={element.content}
                          className='w-full focus:outline-blue-300 h-32 p-2 resize-none border-2 border-gray-500 rounded-md'
                          onChange={(e) => changeText(e.target.value, index)}
                        />
                      </div>
                    }

                  </>
                }
                {
                  element.type === "button" &&
                  <>
                    <div className='p-3'>
                      Button
                    </div>
                    <div className="flex flex-col justify-center bg-gray-400 mx-3 rounded-md py-1 items-center">
                      <div className='flex flex-row w-11/12 mt-3 bg-blue-400 justify-center border-blue-500 border-2 rounded-md'>
                        <input
                          className='w-4/5 p-2 bg-gray-600 focus:outline-none text-gray-200 font-semibold'
                          placeholder={`${element.placeholder}`}
                          value={element.content}
                        // onChange={(e) => changeText(e.target.value, index)}
                        />
                        <div className='flex w-1/5 justify-center items-center bg-gray-600'>
                          <button
                            // onClick={() => delBtn(index)}
                            className='text-gray-100 hover:text-gray-300 active:text-black'>
                            <FaTrashAlt />
                          </button>
                        </div>
                      </div>
                      {
                        element.keywords.length &&
                        element.keywords.map((keyword, index) => {
                          return (
                            <input className="w-11/12 bg-gray-600 rounded-md mt-1 px-2 text-sm py-1" placeholder={keyword.placeholder} />
                          )
                        })
                      }
                      <div className='flex flex-row w-11/12 mt-2 px-5 bg-gray-400 justify-center rounded-md border-1'>
                        <div className='flex w-1/12 justify-center items-center bg-gray-400'>
                          <button
                            // onClick={() => delBtn(index)}
                            className='text-gray-100 hover:text-gray-300 active:text-black text-sm'>
                            <FaPlusCircle />
                          </button>
                        </div>
                        <button
                          className='w-11/12 bg-gray-400 focus:outline-none text-white font-semibold text-sm text-center'>Add keyword
                          {/* // onChange={(e) => changeText(e.target.value, index)} */}
                        </button>

                      </div>
                    </div>
                  </>
                }
              </div>
            )
          })}
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
      </div >
    </>
  )
}