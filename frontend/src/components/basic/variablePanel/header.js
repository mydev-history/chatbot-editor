
import { Typography } from "@material-tailwind/react";
import { FaWindowClose } from "react-icons/fa";

export default function Header({ handleModal }) {
  return (
    <>
      <div className="flex flex-row justify-between p-3 border-b-4  border-blue-900">
        <Typography variant="h3" color="blue">
          SET VARIABLES
        </Typography>
        <button onClick={() => handleModal(false)} className="text-2xl">
          <FaWindowClose />
        </button>
      </div>
    </>
  )
}
