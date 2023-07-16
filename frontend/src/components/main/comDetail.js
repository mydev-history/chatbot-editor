
import { comList } from '../../config/comList';

import ComHeader from '../basic/comDetail/comHeader';
import SaveBtn from '../basic/comDetail/saveBtn';
import { useHandlePopUp } from '../../store';

function ComDetail() {

  const crtKey = useHandlePopUp(state => state.crtKey);

  return (
    <>
      <div className='flex flex-col w-[380px] z-20 min-h-screen max-h-screen bg-gray-200 absolute right-0 shadow-xl shadow-white'>
        <ComHeader />
        {comList[`${crtKey}`]}
        <SaveBtn />
      </div >
    </>
  );
}

export default ComDetail;
