import React, { useState } from 'react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Product 1', price: 10, quantity: 2 },
        { id: 2, name: 'Product 2', price: 20, quantity: 1 },
        { id: 3, name: 'Product 1', price: 10, quantity: 2 },
        { id: 4, name: 'Product 2', price: 20, quantity: 1 },
        { id: 5, name: 'Product 1', price: 10, quantity: 2 },
        { id: 6, name: 'Product 2', price: 20, quantity: 1 },

    ]);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const removeFromCart = (itemId: number) => {
        setCartItems(cartItems.filter((item) => item.id !== itemId));
    };

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto p-4 ">

                <h1 className="text-2xl font-bold mb-4 kanit">ตะกร้าสินค้า</h1>
                <div className="grid grid-rows-3 grid-flow-col gap-4  mx-10">

                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (

                        <div className='row-end-3 row-span-2'>
                        
                    

                            {cartItems.map((item) => (
                            <div key={item.id} className="mb-4 p-2 border border-gray-200 flex justify-between items-center">
                                <span>
                                {item.name} - ${item.price} x {item.quantity}
                                </span>
                                <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700"
                                >
                                Remove
                                </button>
                            </div>
                            ))}
                            <p className="font-semibold text-xl mt-4">Total: ${getTotalPrice()}</p>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                            Checkout
                            </button>
                        </div>
                        
                    
                    )}
                    <div className='row-end-3 row-span-2'>
                        <div className='flex justify-center'>
                            <div >
                                <a href="/" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">รายละเอียดร้านค้า</h5>
                                    <p className="font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                </a>
                                <a href="/" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">รายละเอียดผู้รับสินค้า</h5>
                                    <p className="font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default Cart;
