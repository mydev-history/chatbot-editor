import React from "react";
import { useComponent } from "../../store";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
export default function Optinout() {
  const [load, setLoad] = React.useState(false);

  const sltCom = useComponent(state => state.sltCom);
  const handleSltCom = useComponent(state => state.handleSltCom);

  const changeText = (value, index) => {
    let comData = sltCom;
    comData.elements[index].content = value;
    handleSltCom(comData);
    setLoad(!load);
  }

  const changeButText = (value, index) => {
    let comData = sltCom;
    comData.elements[1].buttons[index].content = value;
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
                      Text
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
                  element.type === "buttons" &&
                  <>
                    <div className='p-3'>
                      Buttons
                    </div>
                    <div className="flex flex-col justify-center bg-gray-400 mx-3 rounded-md py-3 items-center">
                      {
                        element.buttons.map((button, index) => {
                          return (
                            <div className='flex flex-row w-11/12 mt-2 bg-gray-600 justify-center border-blue-500 border-2 rounded-md'>
                              <input
                                className='w-4/5 p-2 bg-gray-600 focus:outline-none text-gray-200 font-semibold'
                                placeholder={`${button.placeholder}`}
                                value={button.content}
                                onChange={(e) => changeButText(e.target.value, index)}
                              />

                            </div>

                          )
                        })
                      }
                    </div>
                  </>
                }
              </div>
            )
          })}

      </div>
    </>
  )
}