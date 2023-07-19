
import { useEffect, useState } from "react";
import { FcAndroidOs } from "react-icons/fc";
export default function Sendmsg({
  test,
  nextStep,
}) {
  useEffect(() => {
    setTimeout(() => {

      nextStep('', test.elements[0].sp_id);
    }, 300);
  }, [])
  return (
    <>
      {test.elements.map((element, index) => {
        return (
          <div key={index} className="flex justify-start">
            {element.type === "txt" &&
              <div className="flex flex-row items-end">
                <div className="text-3xl">
                  <FcAndroidOs />
                </div>
                <div
                  className=" ml-2 py-3 px-4 bg-white rounded-br-3xl break-words rounded-tr-3xl rounded-tl-xl text-black max-w-full mb-3"
                >
                  {element.content}
                </div>
              </div>
            }
          </div>
        )
      })}
    </>
  )
}