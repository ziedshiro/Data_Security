import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom';
interface OpenModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>; 
}
export default function Sidebar({open,setOpen}:OpenModal) {

    const handleClick = () => {
      console.log("logout")
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
                        คุณ บอส โสภพ
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6 kanit">
                      <div>
                        <Link to='/history'>
                          ออเดอร์
                        </Link>
                      </div>
                      <div>
                        <Link to='/cart'>
                          ตะกร้าสินค้า
                        </Link>
                      </div>                      
                      <div>
                        <Link to='/favorite'>
                          ร้านค้าที่ชื่นชอบ
                        </Link>
                      </div>
                    </div>
                    <div className="relative px-4 kanit">
                      <div className='cursor-pointer' onClick={handleClick}>
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