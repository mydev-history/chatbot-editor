import {
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { FaWindowClose } from "react-icons/fa";

export default function Header({
  endTest,
  setAllTest,
}) {
  const shutTest = () => {
    endTest();
    setAllTest([]);
  }
  return (
    <>
      <CardHeader color="blue-gray" className="relative h-16">
        <Typography variant="h5" color="blue-gray" className="flex justify-center mt-3">
          CHATBOT TEST
        </Typography>
        <button
          onClick={shutTest}
          className='absolute top-5 text-2xl  right-10 text-gray-400 hover:text-gray-700 active:text-gray-900'
        >
          <FaWindowClose />
        </button>
      </CardHeader>
    </>
  )
}