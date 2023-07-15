import React from "react";
import { useHandlePopUp, useComponent } from "../../store";
import { elements } from "../../config/models";
export default function ItemButton({
  keyValue,
  icon,
  title
}) {
  const sltCrtKey = useHandlePopUp(state => state.sltCrtKey);
  const shutPopUp = useHandlePopUp(state => state.shutPopUp);
  const handleSltCom = useComponent(state => state.handleSltCom);

  const sltComponent = (keyValue) => {
    sltCrtKey(keyValue);
    shutPopUp();
    handleSltCom({
      key: keyValue,
      icon: icon,
      title: title,
      elements: elements[keyValue]
    })
  }
  return (
    <>
      <button
        onClick={() => sltComponent(keyValue)}
        className="flex w-full h-14 border-2 shadow-lg items-center p-2 rounded-md bg-black  hover:scale-105"
      >
        <div className="flex flex-row justify-center items-center">
          <div className="flex h-10 w-10 text-2xl justify-center items-center text-white">
            {icon}
          </div>
          <div className="text-lg ml-1 text-white">
            {title}
          </div>
        </div>
      </button>
    </>
  );
}