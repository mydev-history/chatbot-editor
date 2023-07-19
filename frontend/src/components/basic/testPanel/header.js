import {
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { FaWindowClose, FaSyncAlt } from "react-icons/fa";
import { useComponent, useDraw } from "../../../store";

export default function Header({
  endTest,
  setAllTest,
}) {

  const allCom = useComponent(state => state.allCom);
  const allLines = useDraw(state => state.allLines);

  const shutTest = () => {
    endTest();
    setAllTest([]);
  }
  const refresh = () => {
    if (allLines.length) {
      const index = allLines.findIndex(line => line.sp_id === "start");
      if (index >= 0) {
        const currentId = allLines[index].ep_id
        const currentStep = Object.assign({}, allCom.filter(com => com._id === currentId)[0]);
        const currentLines = allLines.filter(line => line.sp_id.includes(currentId));
        currentLines.forEach(line => {
          const no = parseInt(line.sp_id.split("-")[1]);
          currentStep.elements[no].sp_id = line.sp_id;
        });
        const allTestData = [];
        allTestData.push(currentStep);
        setAllTest(allTestData);
      }
    }
  }

  return (
    <>
      <CardHeader color="blue-gray" className="relative min-h-[64px]">
        <button
          onClick={refresh}
          className="p-[2px] absolute top-[18px] left-6 text-2xl rounded-full hover:text-gray-400 active:text-gray-700">
          <FaSyncAlt />
        </button>
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