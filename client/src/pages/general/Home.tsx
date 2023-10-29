import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import landingpage from "../../img/landingpage.jpg";
import imagepath from "../../img/Example1.webp";
import React, { useState } from 'react';
function Home() {

    const [showMore, setShowMore] = useState(false);
    const initialOrdersToShow = 8;
    const totalOrders = promotions.length; // Assuming promotions is your array of orders

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const ordersToDisplay = showMore ? promotions : promotions.slice(0, initialOrdersToShow);
    return (
        <>
            <img
                src={landingpage}
                alt="Landing Image"
                className="w-full rounded shadow-lg"
            />
            <div className="container mx-auto my-10">
                <div className="container mx-auto my-10">
                    <h1 className="text-3xl font-semibold mb-4 my-4">โปรโมชัน Yummy ใน <span style={{ color: 'red' }}>KAMPHANGSAEN</span></h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {ordersToDisplay.map((product, index) => (
                            <div key={index}>
                                {/* แสดงข้อมูลสินค้าที่คุณต้องการ */}
                                <img src={imagepath} className="rounded shadow-lg" />
                                <h2 className="text-xl font-semibold my-2">{product.name}</h2>
                            </div>
                        ))}
                    </div>
                    {totalOrders > initialOrdersToShow && (
                     <div className="text-center p-4 mx-auto">
                     <button
                       onClick={toggleShowMore}
                       className="my-4 border border-gray-400 rounded-lg px-5 py-5 hover:text-red-500 hover:bg-red-300"
                     >
                       {showMore ? 'Show Less' : 'See More'}
                     </button>
                   </div>
                    
                    )}
                </div>
                <hr></hr>
                <h1 className="text-3xl font-semibold mb-4 my-4">ประเภทสินค้าเพื่อคุณ</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.map((product, index) => (
                        <div
                            key={index}
                        >
                            {/* แสดงข้อมูลสินค้าที่คุณต้องการ */}
                            <img
                                src={imagepath}

                                className="rounded shadow-lg"
                            />
                            <h2 className="text-xl font-semibold my-2">{product.name}</h2>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}
const products = [
    // เพิ่มข้อมูลสินค้าที่คุณต้องการแสดง
    { name: 'สินค้า 1', },
    { name: 'สินค้า 2', },
    { name: 'สินค้า 1', },
    { name: 'สินค้า 2', },
    { name: 'สินค้า 1', },
    { name: 'สินค้า 2', },
    // เพิ่มสินค้าเพิ่มเติม
];
const promotions = [
    // เพิ่มข้อมูลสินค้าที่คุณต้องการแสดง
    { name: 'สินค้า 1', },
    { name: 'สินค้า 2', },
    { name: 'สินค้า 1', },
    { name: 'สินค้า 2', },
    { name: 'สินค้า 1', },
    { name: 'สินค้า 2', },
    { name: 'สินค้า 1', },
    { name: 'สินค้า 2', },
    { name: 'สินค้า 1', },
    { name: 'สินค้า 2', },
    { name: 'สินค้า 1', },
    { name: 'สินค้า 2', },
    { name: 'สินค้า 1', },
    { name: 'สินค้า 2', },
    { name: 'สินค้า 1', },
    { name: 'สินค้า 2', },

    // เพิ่มสินค้าเพิ่มเติม
];
export default Home;
<>
    Home
</>