import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

import { getAllVariables, delVariable } from "../../../services/variable.service";
import { useVariable } from "../../../store";
export default function Body() {

  const allVariables = useVariable(state => state.allVariables);

  const setAllVariables = useVariable(state => state.setAllVariables);

  const deleteVariable = (id) => {
    delVariable(id)
      .then(val => {
        const allVariablesData = allVariables.filter(variable => variable._id !== val);
        setAllVariables(allVariables);
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllVariables()
      .then(val => {
        setAllVariables(val);
      })
  }, [allVariables])
  return (
    <>
      <div className="w-full overflow-y-auto variable-scrollbar">
        <table className="w-full min-w-max table-auto text-left shadow-blue-gray-50 shadow-md">
          <thead className="">
            <tr className=" ">
              <th className="border-b border-blue-gray-600 bg-blue-gray-300 p-2 rounded-tl-2xl">No</th>
              <th className="border-b border-blue-gray-600 bg-blue-gray-300 p-2">Name</th>
              <th className="border-b border-blue-gray-600 bg-blue-gray-300 p-2">Type</th>
              <th className="border-b border-blue-gray-600 bg-blue-gray-300 p-2 rounded-tr-2xl">Delete</th>
            </tr>
          </thead>
          <tbody className=" bg-blue-gray-50 w-full font-semibold text-left">
            {
              allVariables.length > 0 &&
              allVariables.map((variable, index) => {
                return (
                  <tr key={variable._id}>
                    <td className="pl-2">{index + 1}</td>
                    <td className="pl-2">{variable.vname}</td>
                    <td className="pl-2">{variable.vtype}</td>
                    <td>
                      <button onClick={() => deleteVariable(variable._id)} className="mt-2 ml-3">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>

        </table>
      </div>
    </>
  )
}