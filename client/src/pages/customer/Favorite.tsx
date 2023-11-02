import { useFetchFavouriteQuery, useRemoveFavouriteMutation } from "../../store";
import imagepath from "../../img/Example1.webp";
import { Box, Skeleton } from "@mui/material";
import Swal from "sweetalert2";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AiFillHeart } from "react-icons/ai";

function Favorite() {
    const { data, isFetching, error } = useFetchFavouriteQuery("");
    const [ unFavorite ] = useRemoveFavouriteMutation();

    const handleClick = async (id:string) => {
        Swal.fire({
            timerProgressBar: true,
            allowEscapeKey: false,
            allowOutsideClick: false,
            background: 'transparent',
            didOpen: () => {
              Swal.showLoading();
            }
        })
        await unFavorite(id);
        Swal.close();
    }

    if(error){
        Cookies.remove('userdata')
        Cookies.remove('jwt');

        Swal.fire({
            icon: 'error',
            title: 'Authentication Error',
            text: `Please Login!`,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: true,
        });

        return <Navigate to='/'  />
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
            <div className="bg-red-500">
            <p className="text-4xl leading-tight font-semibold text-white px-24 py-10 kanit">
                Favorite
            </p>
            </div>
            <div className="bg-gray-50">
                <div className="container max-w-7xl px-4 mx-auto sm:px-8">
                    <div className="py-8">
                        <div className="flex flex-col w-full mb-1">
                            <div className="grid gap-x-8 gap-y-10 grid-cols-4 mt-10">
                            {
                                isFetching || error ?
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
                            (data.map((store:any, index:number) => (
                                <div
                                    key={index}
                                >
                                    <Link to={`/infostore/${store.store.storeId}`}>
                                        <img
                                            src={imagepath}
                                            alt="img_store"
                                            className="rounded shadow-lg hover:scale-105"
                                        />
                                    </Link>
                                    <div className="flex justify-between items-center cursor-pointer mx-2">
                                        <Link to={`/infostore/${store.storeId}`} className="text-lg font-thin my-2 kanit">{store.store.name}</Link>
                                        <AiFillHeart size={20} className="text-red-500" onClick={() => handleClick(store.favouriteId)}/>
                                    </div>
                                </div>
                            )))
                            }
                            </div>
                        </div>
                        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Favorite;