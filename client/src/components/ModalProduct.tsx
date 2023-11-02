import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button, } from "@material-tailwind/react";
import { ProductData } from '../Model/Product';
import thaiDateFormat from "../utils/thaiDateFormat";
import exampleImg from '../img/Example1.webp'
import { useNavigate } from 'react-router-dom';

interface OpenModal {
    open: boolean;
    onHide: Function; 
    product: ProductData;
}

function ModalProduct({ open, onHide, product }: OpenModal) {
    const navigate = useNavigate();
    console.log(product);
  
    const [spin,setSpin] = useState(false);

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
                    <Dialog.Panel className="p-5 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                        <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                        >
                            รายละเอียด
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-700">
                                Name: {product.name}
                            </p>
                            <p className="text-sm text-gray-700">
                                Type: {product.type.typeName}
                            </p>
                            <p className="text-sm text-gray-700">
                                Description: {product.description}
                            </p>
                            <p className="text-sm text-gray-700">
                                Expire-Date: {thaiDateFormat(product.expiryDate)}
                            </p>
                            <p className="text-sm text-gray-700">
                                Price: {product.price}
                            </p>
                            <p className="text-sm text-gray-700">
                                Discount-Price: {product.discountPrice}
                            </p>
                            <p className="text-sm text-gray-700">
                                Quantity: {product.quantityAvailable}
                            </p>
                            <img
                                className="h-80 w-full object-cover object-center mt-2"
                                src={require(`C:/image/Files-Upload/products/${product.imgProduct}`)}
                                alt={'img-'+product.productId}
                            />
                        </div>
                        <div className="mt-4 h-1/4">
                        <Button
                            color='blue'
                            variant='outlined'
                            className='mr-2'
                            disabled={spin}
                            onClick={()=>onHide()}
                        >
                            Cancel
                        </Button>
                        <Button
                            color='yellow'
                            variant='outlined'
                            disabled={spin}
                            onClick={()=>navigate(`/store/product/${product.productId}`)}
                        >
                            Edit
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

export default ModalProduct;