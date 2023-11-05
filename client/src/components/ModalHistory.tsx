import { Fragment, ReactNode, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { format } from 'date-fns';
import { useFetchHistoryDetailQuery, useGeneratePickupQRCodeQuery } from '../store';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { CircularProgress } from '@mui/joy';

interface OpenModal {
    open: boolean;
    onHide: Function; 
    children?: ReactNode;
    item:any;
}

function ModalHistory({ open ,onHide ,item }:OpenModal) {
    const navigate = useNavigate();
    const cancelButtonRef = useRef(null);
    const { data:qrCode, isFetching:isQRCode, error:errorQRCode} = useGeneratePickupQRCodeQuery({orderId:item?.orderId});
    const { data:items, isFetching:isItem, error:errorItem } = useFetchHistoryDetailQuery(item?.orderId);
    
    if(errorQRCode || errorItem){
        Cookies.remove('jwt',{ path: '/' });
        Cookies.remove('userdata', { path: '/' });
        Cookies.remove('orders', { path: '/' });

        Swal.fire({
            icon: 'error',
            title: 'Authentication Error',
            text: `Please Login!`,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: true,
        });

        navigate('/login');
    }

    return ( 
        <Transition.Root show={open} as={Fragment}>
            <Dialog 
                as="div" 
                className="relative z-10" 
                initialFocus={cancelButtonRef} 
                onClose={()=>{
                    onHide();
                }}
                >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                                <div className="bg-white px-20 py-8">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center">                         
                                            <div className= "container mx-auto">
                                                <div className="w-80">
                                                    {isQRCode || errorQRCode || isItem || errorItem ?
                                                    <div className="w-80 rounded-b-md py-8 flex justify-center">
                                                        <span className="w-56 h-56 flex justify-center items-center">
                                                            <CircularProgress /> 
                                                        </span>
                                                    </div> 
                                                    : 
                                                    ( (qrCode.results===null) ?
                                                        <></>
                                                        :
                                                    <img className="w-80" src={qrCode.results} alt="QRCode"/>)}
                                                    {/* <img
                                                        src={require(`C:/image/Files-Upload/products/${item?.product?.imgProduct}`)}
                                                        alt="img_product"
                                                        className="rounded-3xl shadow-lg w-80 h-56"
                                                    /> */}
                                                    <div className='mt-10 mx-3'>
                                                        {/* <p className="kanit text-xl font-semibold">{item?.product?.name}</p>
                                                        <div className="flex justify-between items-center mt-2">
                                                            <p className="kanit text-sm text-gray-700">{item?.product?.type?.typeName}</p>
                                                            <p className="kanit text-sm text-gray-700">จำนวน {item?.product?.quantityAvailable}</p>
                                                        </div> */}
                                                        <div className="flex kanit text-gray-500 text-sm">
                                                            {/* <p className="mr-3">วันหมดอายุ</p>
                                                            <p>{format(new Date(item?.product?.expiryDate), 'dd-MM-yyyy HH:mm')}</p> */}
                                                        </div>
                                                            <>
                                                                {/* <p className="text-base kanit text-red-500 mt-1">{item?.product?.price} บาท</p> */}
                                                                <div className="flex justify-center my-6 items-center text-gray-400">
                                                                    <p className="mr-4 text-black cursor-default">{}</p>
                                                                </div>
                                                            </>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
     );
}

export default ModalHistory;