import React from 'react';
import { useComponent, useDraw, useTest } from "../../../store";

import Answer from './answer';
import Btn from '../../testList/btn';
import Sendmsg from '../../testList/sendmsg';
import Media from '../../testList/media';

export default function Body({
  test,
  setLoad,
  load,
}) {
  const allCom = useComponent(state => state.allCom);
  const allLines = useDraw(state => state.allLines);
  const allTest = useTest(state => state.allTest);
  const setAllTest = useTest(state => state.setAllTest);
  const nextStep = (answer, sp_id) => {
    const allTestData = allTest;
    if (answer) {
      const lastTest = allTest[allTest.length - 1];
      lastTest.elements = lastTest.elements.filter(element => element.type !== "button");
      allTestData[allTestData.length - 1] = lastTest;
      const newData = { _id: 'answer', answer: answer };
      allTestData.push(newData);
      setAllTest(allTestData);
    }
    if (allLines.length) {
      const index = allLines.findIndex(line => line.sp_id === sp_id);
      if (index >= 0) {
        const currentId = allLines[index].ep_id
        const currentStep = Object.assign({}, allCom.filter(com => com._id === currentId)[0]);
        if (currentStep._id !== allTest[allTest.length - 1]._id) {
          const currentLines = allLines.filter(line => line.sp_id.includes(currentId));
          currentLines.forEach(line => {
            const no = parseInt(line.sp_id.split("-")[1]);
            currentStep.elements[no].sp_id = line.sp_id;
          });
          allTestData.push(currentStep);
          setAllTest(allTestData);
        }
      }
      setLoad(!load);
    }
  }
  return (
    <>
      {
        test._id === "answer" &&
        <Answer answer={test.answer} />
      }
      {
        test.key === "btn" &&
        <Btn test={test} nextStep={nextStep} />
      }
      {
        test.key === "sendmsg" &&
        <Sendmsg test={test} nextStep={nextStep} />
      }
      {
        test.key === "media" &&
        <Media test={test} nextStep={nextStep} />
      }
    </>
  )
}