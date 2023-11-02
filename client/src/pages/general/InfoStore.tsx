import { useState } from 'react';
import imagepath from "../../img/Example1.webp";
import { useFetchStoreByIdQuery } from '../../store';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { StarIcon } from '@heroicons/react/20/solid'
import { Skeleton } from '@mui/material';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

const InfoStore = () => {
    const { id } = useParams();
    const { data:store,isFetching:isStore,isError:errorStore } = useFetchStoreByIdQuery(id);

    const [activeTab, setActiveTab] = useState(1);
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

    if(errorStore) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'The server crashed.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: true,
        });
    }

    window.scrollTo(0, 0);

    return (
        <>
            <div className='bg-red-500'>
                <div className='container mx-auto kanit px-24 py-10'>
                    {
                    isStore?
                    <div className=''>
                        <Skeleton width="60%" />
                    </div>
                    :
                    <>
                        <p className="text-3xl font-semibold mb-4 my-4 text-white">{store?.name}</p>
                        <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                key={rating}
                                className={classNames(
                                    store.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                    'h-5 w-5 flex-shrink-0'
                                )}
                                aria-hidden="true"
                                />
                            ))}
                        </div>
                    </>
                    }
                </div>
            </div>
            <div className='bg-gray-50'>
                <div className="container mx-auto my-10">
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
                                                alt='img'
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
                                                alt='img'
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
                                                alt='img'
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
            </div>
        </>
    );
};


export default InfoStore;
