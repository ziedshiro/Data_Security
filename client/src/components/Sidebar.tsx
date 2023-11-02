import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { BsPower } from 'react-icons/bs'

interface OpenModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>; 
}
export default function Sidebar({open,setOpen}:OpenModal) {
  const navigate = useNavigate();
  const user = Cookies.get('userdata') !== undefined ? Cookies.get('userdata') : null;
  let userData;
  if(user){
    userData = JSON.parse(user)
  }
  const handleLogout = async () => {
    await Cookies.remove('jwt',{ path: '/' });
    await Cookies.remove('userdata', { path: '/' });
    Swal.fire({
        icon: 'success',
        title: 'Logout',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: true,
        text: 'Logout Successful',
    });
    setOpen(false);
    navigate("/");
  }

  return (
    <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={setOpen}>
      <Transition.Child
        as={Fragment}
        enter="ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="pointer-events-auto relative w-screen max-w-xs">
                <div className="flex h-full flex-col bg-white py-9 shadow-xl">
                  <div className="px-6">
                    <Dialog.Title className="text-2xl font-semibold leading-6 text-gray-900 kanit">
                      ยินดีต้อนรับ
                    </Dialog.Title>
                    <Dialog.Title className="text-lg mt-3 ml-2 font-semibold leading-6 text-red-600  kanit">
                      คุณ {userData?.firstname} {userData?.lasname}
                    </Dialog.Title>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <div className='kanit text-gray-500 hover:text-red-500 font-thin'>
                      <Link to='/history'>
                        ออเดอร์
                      </Link>
                    </div>
                    <div className='kanit text-gray-500 hover:text-red-500 font-thin'>
                      <Link to='/cart'>
                        ตะกร้าสินค้า
                      </Link>
                    </div>                      
                    <div className='kanit text-gray-500 hover:text-red-500 font-thin'>
                      <Link to='/favorite'>
                        ร้านค้าที่ชื่นชอบ
                      </Link>
                    </div>
                  </div>
                  <div className="relative px-4 kanit">
                    <div className='cursor-pointer text-gray-500 font-thin hover:text-red-500 flex' onClick={handleLogout}>
                      <BsPower/>
                      ออกจากระบบ
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
  );
}