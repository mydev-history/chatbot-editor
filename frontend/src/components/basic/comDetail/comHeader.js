
import { FaWindowClose } from "react-icons/fa";

import { keyData } from '../../../config/items'

import { useHandlePopUp, useComponent } from '../../../store';

export default function ComHeader() {
  const sltCrtKey = useHandlePopUp(state => state.sltCrtKey);
  const sltCom = useComponent(state => state.sltCom);
  return (
    <>
      <div className='flex flex-row w-full h-20 border-b-2 bg-gray-200 border-gray-500 items-center p-4'>
        <div className='text-3xl text-pink-400'>
          {keyData[`${sltCom.key}`]['icon']}
        </div>
        <p className='text-2xl ml-4 font-bold text-gray-600'>
          {keyData[`${sltCom.key}`]['title']}
        </p>
        <button
          onClick={() => sltCrtKey('')}
          className='absolute top-7 text-2xl  left-[340px] text-gray-400 hover:text-gray-700 active:text-gray-900'
        >
          <FaWindowClose />
        </button>
      </div >
    </>
  )
}