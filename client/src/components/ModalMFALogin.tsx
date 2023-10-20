import { Fragment, ReactNode, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { useMFACodeQuery } from '../store';
import { LoginUser } from '../Model/User';
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import Swal from 'sweetalert2';
import Media from './Media';
import { userLoginMFA } from '../store';
import { useAppDispatch } from '../hook/use-dispatch-selector';
import Cookies from "js-cookie";

interface OpenModal {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    children?: ReactNode;
    title?:string;
    user?:LoginUser
    setUser:React.Dispatch<React.SetStateAction<LoginUser | undefined>>; 
}

export default function ModalMFALogin({ open, setOpen,children,title,user,setUser }: OpenModal) {
    const dispatch = useAppDispatch();
    const { data:MFA,isFetching:MFAFetching,isError:MFAError } = useMFACodeQuery(user?.userId);
    const navigate = useNavigate();
    const cancelButtonRef = useRef(null);;

    let content;
    if(MFAFetching || MFAError){
        content = <Skeleton className='my-5'  animation="wave" variant="rectangular" width={200}  height={200}/>
    }else{
        content =  <img className='w-60' src={MFA.uri} alt="mfaImage"/>
    }

    if(MFAError){
        navigate("/");
    }

    const handleLoginSubmit = async (e: React.FormEvent) => {
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
            console.log(user,MFA);
            user.secretcode = inputValue;
            dispatch(userLoginMFA(user)).then((result:any) => {
               if(result.payload?.status ===  "UNAUTHORIZED"){
                Swal.close();
                setOpen(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Register Failed',
                    text: `${result.payload.msg[0]}`,
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    allowOutsideClick: true,
                });
               }else{
                console.log();
                Cookies.set('jwt', result.payload.accessToken)
                Swal.close();
                setOpen(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    allowOutsideClick: true,
                    text: 'Login Successful',
                });
                setUser(undefined);
                navigate('/');
                const storedJwt = Cookies.get('jwt');
                console.log('Stored JWT:', storedJwt);
               }
               
            }); 
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
                                            {MFAFetching ? <Media height={40} width={310} />:
                                            <Dialog.Title as="h2" className="text-xl font-semibold leading-6 text-gray-900 flex justify-center">
                                                Setup Multi-Factor Authentication
                                            </Dialog.Title>}

                                            <div className="mt-2">
                                                <div className="flex justify-center w-full rounded-lg overflow-hidden mb-2">
                                                    {content}
                                                </div>
                                                <form onSubmit={handleLoginSubmit}>
                                                    {MFAFetching ? <Media height={30} width={120} />:
                                                    <label
                                                        className="block text-sm font-semibold text-gray-800 mb-3"
                                                    >
                                                        Verification Code
                                                    </label>}
                                                    {MFAFetching ? <Media height={65} width={310} />:
                                                    <input
                                                        type="text"
                                                        id="codeTwoFactorAuthentication"
                                                        name="codeTwoFactorAuthentication"
                                                        className="block w-full px-4 py-2 my-2 bg-white border rounded-md  focus:outline-none"
                                                    />}
                                                    <div className='flex justify-center mb-3'>
                                                    {MFAFetching ? <Media height={60} width={145} />:
                                                        <Button className="mt-3 w-40" color="red" type="submit">Verify</Button>
                                                    }
                                                    </div>
                                                </form>
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
    )
}