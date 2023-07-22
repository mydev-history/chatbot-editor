


import { useVariable } from "../../store";


import Header from "../basic/variablePanel/header";
import AddVariable from "../basic/variablePanel/addVariable";
import Body from "../basic/variablePanel/body";

export default function VariablePanel() {

  const isShowModal = useVariable(state => state.isShowModal);

  const handleModal = useVariable(state => state.handleModal);


  return (
    <>
      <div className={`${isShowModal ? '' : 'hidden'} flex flex-col gap-4 absolute top-0 left-0 min-h-screen max-h-screen w-96 bg-blue-gray-200 z-50 rounded-tr-lg rounded-br-lg shadow-lg shadow-blue-gray-100 p-2`}>
        <Header handleModal={handleModal} />
        <AddVariable />
        <Body />
      </div>
    </>
  );
}