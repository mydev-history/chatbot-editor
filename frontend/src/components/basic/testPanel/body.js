import React from 'react';
import { useComponent, useDraw, useTest } from "../../../store";

import Btn from '../../testList/btn';
import Answer from './answer';

export default function Body({
  test,
  setLoad,
  load,
}) {
  const allCom = useComponent(state => state.allCom);
  const allLines = useDraw(state => state.allLines);
  const allTest = useTest(state => state.allTest);
  const setAllTest = useTest(state => state.setAllTest);
  console.log("allCom", allCom)
  const nextStep = (answer, sp_id) => {
    const allTestData = allTest;
    const lastTest = allTest[allTest.length - 1];
    lastTest.elements = lastTest.elements.filter(element => element.type !== "button");
    allTestData[allTestData.length - 1] = lastTest;
    const newData = { _id: 'answer', answer: answer };
    allTestData.push(newData);
    setAllTest(allTestData);
    if (allLines.length) {
      const index = allLines.findIndex(line => line.sp_id === sp_id);
      if (index >= 0) {
        const currentId = allLines[index].ep_id;
        const currentStep = Object.assign({}, allCom.filter(com => com._id === currentId)[0]);
        const allTestData = allTest;
        allTestData.push(currentStep);
        setAllTest(allTestData);
      }
      setLoad(!load);

    }
  }
  return (
    <>
      {
        test._id !== "answer" &&
        <Btn test={test} nextStep={nextStep} />
      }
      {
        test._id === "answer" &&
        <Answer answer={test.answer} />
      }
    </>
  )
}