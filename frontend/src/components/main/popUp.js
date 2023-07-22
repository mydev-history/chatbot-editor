import React from "react";
import { Modal } from 'react-bootstrap';


import { useHandlePopUp } from "../../store";
import ItemButton from "../basic/itemButton";

import { items } from '../../config/items';

export default function PopUp() {
  const shutPopUp = useHandlePopUp(state => state.shutPopUp);
  const popUpShow = useHandlePopUp(state => state.popUpShow);
  return (
    <>
      <Modal
        show={popUpShow}
        onHide={shutPopUp}
        className="modal-lg"
      >
        <div className="h-[850px] p-5 bg-gray-800 rounded-md overflow-y-auto popup-scrollbar">
          {
            items.length > 0 &&
            items.map(item => {
              return (
                <div className="w-full mt-3" key={item["category"]}>
                  <div className="mb-3 text-xl font-bold text-white">
                    {item["category"]}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {
                      item["data"].map(it => {
                        return (
                          <ItemButton
                            key={it["key"]}
                            icon={it["icon"]}
                            title={it["title"]}
                            keyValue={it["key"]}
                          />
                        )
                      })
                    }
                  </div>

                </div>
              )
            })
          }
        </div>
      </Modal >
    </>
  );
}