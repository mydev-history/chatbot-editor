import { FaRegStopCircle } from 'react-icons/fa'
import { Tooltip } from "@material-tailwind/react";
import { useDraw } from "../../store"

export default function DrawButton() {

  const disableDraw = useDraw(state => state.disableDraw);

  return (
    <>
      <Tooltip
        className="p-2 font-semibold text-gray-200 bg-red-500"
        content="Stop drawing"
        placement="right">
        <button
          onClick={disableDraw}
          className="flex  absolute top-4 left-10 text-4xl items-center text-red-700 p-2 rounded-md gap-2 hover:text-red-500 active:text-red-900"
        >
          <FaRegStopCircle />
        </button>
      </Tooltip>
      <div
        className="flex absolute top-1 left-1/2 text-5xl -translate-x-1/2 text-yellow-300 font-serif animate-pulse"
      >
        D R A W I N G. . .
      </div>
    </>
  )
}