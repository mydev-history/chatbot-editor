import React from "react";
import { useComponent } from "../../store";

export default function Txt() {

  const [load, setLoad] = React.useState(false);

  const sltCom = useComponent(state => state.sltCom);
  const handleSltCom = useComponent(state => state.handleSltCom);

  const changeText = (value, index) => {
    let comData = sltCom;
    comData.elements[index].content = value;
    handleSltCom(comData);
    setLoad(!load);
  }

  return (
    <>
      <div className=''>
        {
          sltCom.elements.length > 0 &&
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
              </div>
            )
          })
        }
      </div>
    </>
  )
}