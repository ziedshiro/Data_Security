import React, { useState } from 'react';
import imagepath from "../../img/Example1.webp";


const InfoStore = () => {

    const [activeTab, setActiveTab] = useState(1);
    const [name] = useState('xxxxxx');
    const [rt] = useState('1.0');
    const handleTabClick = (tabNumber: number) => {
        setActiveTab(tabNumber);
    };
    const products1 = [
        // เพิ่มข้อมูลสินค้าที่คุณต้องการแสดง
        { name: 'สินค้า 1', },
        { name: 'สินค้า 2', },

        // เพิ่มสินค้าเพิ่มเติม
    ];
    const products2 = [
        // เพิ่มข้อมูลสินค้าที่คุณต้องการแสดง
        { name: 'สินค้า 1', },
        { name: 'สินค้า 2', },
        { name: 'สินค้า 1', },
        { name: 'สินค้า 2', },
        { name: 'สินค้า 1', },
        { name: 'สินค้า 2', },
        // เพิ่มสินค้าเพิ่มเติม
    ];
    const products3 = [
        // เพิ่มข้อมูลสินค้าที่คุณต้องการแสดง
        { name: 'สินค้า 1', },
        { name: 'สินค้า 2', },
        { name: 'สินค้า 1', },
        { name: 'สินค้า 2', },

        // เพิ่มสินค้าเพิ่มเติม
    ];
    const products4 = [
        { name: 'Product 1', d: 's' },
        { name: 'Product 2', d: 's' },
        { name: 'Product 3', d: 's' },
        { name: 'Product 1', d: 's' },
        { name: 'Product 2', d: 's' },
        { name: 'Product 3', d: 's' },
        // Add more products as needed
    ];
    return (
        <div className="container mx-auto my-10">
            <h1 className="text-3xl font-semibold mb-4 my-4">ร้าน {name} </h1>

            <h1 className="text-3xl font-semibold mb-4 my-4">
                Rating : {rt}
            </h1>
            <div className="flex justify-center space-x-4">
                <button
                    className={`px-4 py-2 ${activeTab === 1 ? 'bg-blue-500' : 'bg-gray-300'} text-white`}
                    onClick={() => handleTabClick(1)}
                >
                    Tab 1
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 2 ? 'bg-blue-500' : 'bg-gray-300'} text-white`}
                    onClick={() => handleTabClick(2)}
                >
                    Tab 2
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 3 ? 'bg-blue-500' : 'bg-gray-300'} text-white`}
                    onClick={() => handleTabClick(3)}
                >
                    Tab 3
                </button>

            </div>
            <div className="p-4">
                <div className='container mx-auto my-10'>
                <hr  className='my-4'/>
                   <h1 className="text-3xl font-semibold mb-4 my-4">สินค้าในร้าน </h1> 
                  
                    {activeTab === 1 && <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {products1.map((product, index) => (
                                <button
                                    key={index}
                                >
                                    {/* แสดงข้อมูลสินค้าที่คุณต้องการ */}
                                    <img
                                        src={imagepath}

                                        className="rounded shadow-lg"
                                    />
                                    <h2 className="text-xl font-semibold my-2">{product.name}</h2>
                                </button>
                            ))}
                        </div>
                    </div>}
                    {activeTab === 2 && <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {products2.map((product, index) => (
                                <button
                                    key={index}
                                >
                                    {/* แสดงข้อมูลสินค้าที่คุณต้องการ */}
                                    <img
                                        src={imagepath}

                                        className="rounded shadow-lg"
                                    />
                                    <h2 className="text-xl font-semibold my-2">{product.name}</h2>
                                </button>
                            ))}
                        </div>
                    </div>}
                    {activeTab === 3 && <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {products3.map((product, index) => (
                                <button
                                    key={index}
                                >
                                    {/* แสดงข้อมูลสินค้าที่คุณต้องการ */}
                                    <img
                                        src={imagepath}

                                        className="rounded shadow-lg"
                                    />
                                    <h2 className="text-xl font-semibold my-2">{product.name}</h2>
                                </button>
                            ))}
                        </div>
                    </div>}
                    <hr  className='my-4'/>

                    <h1 className="text-3xl font-semibold mb-4 my-4">สินค้าที่หมดแล้ว </h1> 
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {products4.map((product, index) => (
                                <button key={index} className="relative">
                                    {/* Check if it's the 4th product to apply styling */}

                                  
                                        {/* Show a regular product */}
                                        <div className="rounded shadow-lg" style={{
                                            backgroundImage: `url(${imagepath}), linear-gradient(to bottom, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 1))`,
                                            width: '308px',
                                            height: '190px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',

                                        }} ><h1 className="text-3xl font-semibold mb-4 my-4" style={{ backgroundColor: 'lightgray', padding: '10px' }}>สินค้าหมด </h1></div>
                                        <h2 className="text-xl font-semibold my-2">{product.name}</h2>
                                    

                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};


export default InfoStore;
