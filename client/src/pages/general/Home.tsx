import landingpage from "../../img/landingpage.jpg";
import imagepath from "../../img/Example1.webp";
import { useState } from 'react';
import { useFetchStoreQuery, useFetchTypeQuery } from "../../store";
import { Box, Skeleton } from "@mui/material";
import Swal from "sweetalert2";
import { StarIcon } from '@heroicons/react/20/solid'
import { Link } from "react-router-dom";

function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

function Home() {

    const [showMore, setShowMore] = useState(false);
    const initialOrdersToShow = 8;
    const totalOrders = promotions.length; 

    const { data:store,isFetching:isStore,isError:errorStore } = useFetchStoreQuery("");
    const { data:type,isFetching:isType,isError:errorType } = useFetchTypeQuery("");

    const sortedStores = store?.slice().sort((a:any, b:any) => b.rating - a.rating);

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
                        {
                        isStore ?
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
                        ((showMore ? sortedStores : sortedStores.slice(0, initialOrdersToShow)).map((store:any, index:number) => (
                            <Link to={`/infostore/${store.storeId}`} key={index}>
                                <img src={imagepath} alt="img_store" className="rounded shadow-lg hover:scale-105" />
                                <div className="flex justify-between">
                                    <h2 className="text-lg font-thin my-2 kanit">{store.name}</h2>
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                            key={rating}
                                            className={classNames(
                                                store.rating > rating ? 'text-red-500' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                            />
                                        ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-sm font-thin my-2 kanit">{store.provinces.nameInThai}</p>
                                        <p className="text-sm font-thin my-2 kanit">{store.storeOpen.split(":").slice(0, 2).join(":")} - {store.storeClose.split(":").slice(0, 2).join(":")}</p>
                                    </div>
                                </Link>
                        )))}
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
                    (type.map((type:any, index:number) => (
                        <Link
                            to={`/type/${type.typeId}`}
                            key={index}
                        >
                            <img
                                src={require(`../../img/types/${type?.img}`)}
                                alt="img_type"
                                className="rounded shadow-lg hover:scale-105"
                            />
                            <h2 className="text-lg font-thin my-2 kanit">{type.typeName}</h2>
                        </Link>
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