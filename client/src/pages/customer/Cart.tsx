import React, { useState } from 'react';
import { useFetchCartOrderQuery, useFetchCartQuery } from '../../store';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Cart = () => {
    const navigate = useNavigate();
    const { data:orderItem, isFetching:isOrderItem, error:errorOrderItem } = useFetchCartQuery("");
    const { data:orders, isFetching:isOrder, error:errorOrder } = useFetchCartOrderQuery("");
    const user = Cookies.get('userdata') !== undefined ? Cookies.get('userdata') : null;
    const total = orders?.map((result:any) => {
        // result?.totalAmount
    })

    console.log(orderItem)
    let userData;
    if(user){
        userData = JSON.parse(user)
    }

    const getTotalPrice = () => {
        // return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const removeFromCart = (itemId: number) => {
        // setCartItems(cartItems.filter((item) => item.id !== itemId));
    };

    const handlePayment = () => {
        navigate('/payment')
    }

    if(errorOrder || errorOrderItem){
        Cookies.remove('jwt',{ path: '/' });
        Cookies.remove('userdata', { path: '/' });

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
        <>
        <div className="bg-red-500">
            <p className="text-4xl leading-tight font-semibold text-white px-24 py-10 kanit">
                ตะกร้าสินค้า
            </p>
        </div>
        <div className="bg-gray-50">
            <div className="container mx-auto p-4 ">
                <div className="grid grid-rows-3  mx-10">
                    {orders?.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div className='row-end-3 row-span-2 bg-white rounded-xl shadow-md'>
                        
                            {orders?.map((order:any) => (
                                <>
                                <div key={order?.orderId} className="mb-4 p-2 border border-gray-200 flex justify-between items-center">
                                    <span className="kanit">
                                        {order?.orderId}
                                    {/* {item?.product?.name} {item?.product?.price} x {item?.quantity} */}
                                    </span>
                                    {/* <button
                                    onClick={() => removeFromCart(order?.orderId)}
                                    className="text-red-500 hover:text-red-700"
                                    >
                                    Edit
                                    </button> */}
                                </div>
                                {/* {orderItem?.filter((item:any) => (
                                   <div>

                                    </div> 
                                ))
                                } */}
                                </>
                            ))}
                        </div>
                        
                    
                    )}
                    <div className='row-end-3 row-span-2'>
                        <div className='flex justify-center'>
                            <div>
                                <div className="kanit block py-8 pr-44 pl-8 bg-white border border-gray-200 rounded-xl shadow-md">
                                    <p className="mb-4 text-2xl font-semibold ">ข้อมูลผู้รับสินค้า</p>
                                    <p className="mb-1 font-normal text-gray-600">คุณ {userData?.firstname} {userData?.lasname}</p>
                                    <p className="font-normal text-gray-600">อีเมล {userData?.email}</p>
                                </div>
                                <div className="kanit mt-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                                    <div className="flex justify-between items-center mb-7">
                                        <p className="text-2xl font-semibold">ราคารวม</p>
                                        <p className="text-2xl font-semibold text-red-500">{} บาท</p>
                                    </div>
                                    <div className="text-white bg-red-500 flex justify-center rounded-full text-sm py-3 mx-6 cursor-pointer" onClick={handlePayment}>ชำระเงิน</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>
        </>
    );
};

export default Cart;
