
import {
  Button
} from "@material-tailwind/react";

export default function Btn({
  test,
  nextStep,
}) {
  return (
    <>
      {test.elements.map((element, index) => {
        return (
          <div key={index} className="flex justify-start">
            {element.type === "txt" &&
              <div
                className=" ml-2 py-3 px-4 bg-white rounded-br-3xl break-words rounded-tr-3xl rounded-tl-xl text-black max-w-full mb-3"
              >
                {element.content}
              </div>
            }
          </div>
        )
      })}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {test.elements.filter(element => element.type !== "txt").map((element, index) => {
          return (
            <div key={index}>
              {
                element.type === "button" &&
                <Button
                  onClick={() => nextStep(element.content, element.sp_id)}
                  color="pink"
                  className="w-full">
                  {element.content}
                </Button>
              }
            </div>
          )
        })}
      </div>
    </>
  )
}