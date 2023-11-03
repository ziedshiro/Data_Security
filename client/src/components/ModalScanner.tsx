import { Html5QrcodeScanner } from 'html5-qrcode';
import { useState,useEffect } from "react";
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Button } from "@material-tailwind/react";
import Html5QrcodePlugin from './Html5QrcodePlugin';
import { Html5QrcodeError } from 'html5-qrcode/esm/core';

interface OpenModal {
    open: boolean;
    onHide: Function; 
}


function ModalScanner( { open, onHide }: OpenModal ) {
    const [ scanResult,setScanResult ] = useState('');

    // useEffect(()=>{
    //   const scanner = new Html5QrcodeScanner('reader',{
    //     qrbox:{
    //       width: 250,
    //       height: 250
    //     },
    //     fps: 5,
    //   },false);
  
    //   scanner.render(success,error)
  
    //   function success (result:any){
    //     scanner.clear()
    //     setScanResult(result)
    //   }
  
    //   function error (err:any){
    //     console.log(err);
    //   }    
    // })
    
  const onNewScanResult = (decodedText:string, decodedResult:any) => {
    if(decodedResult.decodedText){
      console.log(decodedResult);
      onHide();
    }
  };

    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog 
          as="div" 
          className="relative z-10" 
          onClose={()=>{}}
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
                <Dialog.Panel className="p-5 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-2/6 min-h-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Scanner
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className='min-h-full min-w-full'>
                      <Html5QrcodePlugin
                        fps={10}
                        qrbox={{ width: 1000, height: 1000 }}
                        disableFlip={false}
                        qrCodeSuccessCallback={onNewScanResult} 
                        qrCodeErrorCallback={
                          function (errorMessage: string, error: Html5QrcodeError): void {
                          console.log(errorMessage);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 h-1/4">
                    <Button
                      color='blue'
                      variant='outlined'
                      className='mr-2'
                      onClick={()=>onHide()}
                    >
                      Cancel
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
}

export default ModalScanner;