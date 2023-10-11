import { Fragment, ReactNode, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { useMFACodeQuery,useRegisterMutation } from '../store';
import User from '../Model/User';
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import Swal from 'sweetalert2';

interface OpenModal {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    children?: ReactNode;
    title?:string;
    user?:User
}

export default function Modal({ open, setOpen,children,title,user }: OpenModal) {
    const { data:MFA,isFetching:MFAFetching,isError:MFAError } = useMFACodeQuery(user?.userId);
    const [register] = useRegisterMutation();
    const [invalidMFA,setInvalidMFA] = useState(null);
    const navigate = useNavigate();
    const cancelButtonRef = useRef(null);

    let content;
    if(MFAFetching){
        content = <Skeleton variant="rectangular" width={275} height={190} />
    }else if(MFAError){
        content = <Skeleton variant="rectangular" width={275} height={190} />
    }else{
        content =  <img className='w-60' src={MFA.uri} alt="mfaImage"/>
    }

    if(MFAError){
        navigate("/");
    }

    const handleRegistrationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        Swal.fire({
            timerProgressBar: true,
            allowEscapeKey: false,
            allowOutsideClick: false,
            background: 'transparent',
            didOpen: () => {
              Swal.showLoading();
            }
          })

        const formElement = e.target as HTMLFormElement;
        const inputElement = formElement.querySelector('[name="codeTwoFactorAuthentication"]') as HTMLInputElement;
        const inputValue = inputElement.value;
        if (user && MFA) {
            user.secretCode = MFA.secret;
            user.codeTwoFactorAuthentication = inputValue;
            const result = await register(user);     
            if ('data' in result) {
                if (result.data.status === "BAD_REQUEST") {
                    setInvalidMFA(result.data.msg);
                    Swal.close();

                    Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid username or password',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    allowOutsideClick: true,
                    });
                }else{
                    setInvalidMFA(null);
                    setOpen(false)
                    Swal.close();
  
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        allowOutsideClick: true,
                        text: 'You are now logged in!',
                        // confirmButtonColor: '#13D300',
                        }).then(() => {
                            navigate('/');
                    });
                }
            }
        }
      };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog 
                as="div" 
                className="relative z-10" 
                initialFocus={cancelButtonRef} 
                onClose={()=>{
                    setOpen(false);
                    setInvalidMFA(null); 
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
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:text-left">                         
                                            {MFAFetching?<Skeleton />:
                                            <Dialog.Title as="h2" className="text-xl font-semibold leading-6 text-gray-900 flex justify-center">
                                                Setup Multi-Factor Authentication
                                            </Dialog.Title>}

                                            <div className="mt-2">
                                                <div className='flex justify-center'>
                                                    {content}
                                                </div>
                                                <form onSubmit={handleRegistrationSubmit}>
                                                    <label
                                                        className="block text-sm font-semibold text-gray-800 mb-3"
                                                    >
                                                        Verification Code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="codeTwoFactorAuthentication"
                                                        name="codeTwoFactorAuthentication"
                                                        className="block w-full px-4 py-2 my-2 bg-white border rounded-md  focus:outline-none"
                                                    />
                                                    {invalidMFA? (
                                                        <p className='text-red-500 text-xs mt-4 mb-2'>{invalidMFA}</p>
                                                    ):(
                                                        <></>
                                                    )}
                                                    <div className='flex justify-center mb-3'>
                                                        <Button className="mt-3 w-40" color="red" type="submit">Verify</Button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => {
                                            setOpen(false)
                                            setInvalidMFA(null)
                                        }}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div> */}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}