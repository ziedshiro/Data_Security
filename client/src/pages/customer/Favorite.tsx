import { useFetchFavouriteQuery } from "../../store";
import imagepath from "../../img/Example1.webp";
import { Box, Skeleton } from "@mui/material";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function Favorite() {
    const { data, isFetching, error } = useFetchFavouriteQuery("");
    console.log(data)

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
        <div className="bg-gray-50">
            <div className="container max-w-7xl px-4 mx-auto sm:px-8">
                <div className="py-8">
                    <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
                        <h2 className="text-2xl leading-tight font-semibold text-gray-600">
                            Favorite
                        </h2>
                        <div className="grid gap-x-8 gap-y-10 grid-cols-4">
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
                        (data.map((product:any, index:number) => (
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
                    <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Favorite;