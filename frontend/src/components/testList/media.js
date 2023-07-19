
import { useEffect, useState } from "react";
import { FcAndroidOs } from "react-icons/fc";
export default function Media({
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
            {element.type === "upload" &&
              <div className="flex flex-row items-end">
                <div className="text-3xl">
                  <FcAndroidOs />
                </div>
                <img width={120} height={120} src={`http://localhost:5000/${element.content}`} alt="upload" />
              </div>
            }
            {element.type === "url" &&
              <div className="flex flex-row items-end">
                <div className="text-3xl">
                  <FcAndroidOs />
                </div>
                <img width={120} height={120} src={`${element.content}`} alt="url" />
              </div>
            }
          </div>
        )
      })}
    </>
  )
}