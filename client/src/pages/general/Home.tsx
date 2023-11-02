import landingpage from "../../img/landingpage.jpg";
import imagepath from "../../img/Example1.webp";
import React, { useState } from 'react';
import { useFetchStoreQuery, useFetchTypeQuery } from "../../store";
import { Box, Skeleton } from "@mui/material";
import Swal from "sweetalert2";
function Home() {

    const [showMore, setShowMore] = useState(false);
    const initialOrdersToShow = 8;
    const totalOrders = promotions.length; 

    const { data:store,isFetching:isStore,isError:errorStore } = useFetchStoreQuery("");
    const { data:type,isFetching:isType,isError:errorType } = useFetchTypeQuery("");

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    if(errorType || errorStore) {
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

    const Media = () => {
        return (
          <div className='mr-10'>
            <Box sx={{ width: 295, height:260 }}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
                <Skeleton variant="rectangular" width={295} height={185} />
              </div>
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
            </Box>
          </div>
        );
      }

    const ordersToDisplay = showMore ? promotions : promotions.slice(0, initialOrdersToShow);
    return (
        <>
            <img
                src={landingpage}
                alt="landingPage"
                className="w-full rounded shadow-lg"
            />
            <div className="container mx-auto my-10">
                <div className="container mx-auto my-10">
                    <h1 className="text-3xl font-semibold my-10 kanit">ร้านค้ายอดนิยมใน <span style={{ color: 'red' }}>Yummy Hub</span></h1>
                    <div className="grid gap-x-8 gap-y-10 grid-cols-4">
                        {ordersToDisplay.map((product:any, index:any) => (
                            <div key={index}>
                                <img src={imagepath} alt="img_store" className="rounded shadow-lg hover:scale-105" />
                                <h2 className="text-lg font-thin my-2 kanit">{product.name}</h2>
                            </div>
                        ))}
                    </div>
                    {totalOrders > initialOrdersToShow && (
                     <div className="text-center p-4 mx-auto">
                     <button
                       onClick={toggleShowMore}
                       className="my-4 border border-gray-400 rounded-lg px-5 py-4 hover:text-red-500 hover:border-red-500"
                     >
                       {showMore ? 'Show Less' : 'See More'}
                     </button>
                   </div>
                    
                    )}
                </div>
                <hr></hr>
                <h1 className="text-3xl font-semibold my-10 kanit">ประเภทสินค้าเพื่อคุณ</h1>
                <div className="grid gap-x-8 gap-y-10 grid-cols-4">
                    {
                        isType || errorType ?
                        <div>
                            <div className='flex'>
                                <Media/>
                                <Media/>
                                <Media/>
                                <Media/>
                            </div>
                            <div className='flex'>
                                <Media/>
                                <Media/>
                                <Media/>
                                <Media/>
                            </div>
                        </div>
                    :
                    (type.map((product:any, index:number) => (
                        <div
                            key={index}
                        >
                            <img
                                src={imagepath}
                                alt="test"
                                className="rounded shadow-lg hover:scale-105"
                            />
                            <h2 className="text-lg font-thin my-2 kanit">{product.typeName}</h2>
                        </div>
                    )))
                    }
                </div>

            </div>
        </>
    );
}
const promotions = [
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
];
export default Home;
<>
    Home
</>