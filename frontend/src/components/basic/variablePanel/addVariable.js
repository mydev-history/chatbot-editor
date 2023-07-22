import React, { useState } from 'react';
import {
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { addVariable } from "../../../services/variable.service";

export default function AddVariable() {
  const [variable, setVariable] = useState({
    vname: "",
    vtype: "string"
  });
  const [waring, setWarning] = useState({
    existed: false,
    empty: false,
  });


  const options = [
    { value: "string", label: "String" },
    { value: "number", label: "Number" },
    { value: "email", label: "Email" },
  ];


  const typeChange = (value) => {
    setVariable({
      ...variable,
      vtype: value
    });
  };
  const nameChange = (e) => {
    setVariable({
      ...variable,
      vname: e.target.value
    });
  };

  const newVariable = () => {
    if (variable.vname) {
      addVariable(variable)
        .then(val => {
          if (val.msg === "existed") {
            console.log("please enter other name")
            setWarning({
              ...waring,
              existed: true,
            })
          }
        })
        .catch(err => {
          console.log("Errors occur.")
        })
    }
    setVariable({
      vname: "",
      vtype: "string"
    })
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3">
        <div>
          <Input
            className=""
            variant="static"
            label="NAME"
            value={variable.vname}
            onChange={nameChange}
            error
          />
        </div>
        <div className="">
          <Select
            value={variable.vtype}
            onChange={typeChange}
            label="TYPE"
            variant="static"
            error
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Button onClick={newVariable} color="pink">Add a Variable</Button>
        </div>

      </div>
    </>
  )

}