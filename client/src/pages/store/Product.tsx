import { Button } from "@material-tailwind/react";
import { Link, Navigate } from "react-router-dom";
import { Skeleton } from '@mui/joy';
import { useFetchAuthStoreQuery } from "../../store";
import Swal from "sweetalert2";

function Product() {
    const { data,isFetching } = useFetchAuthStoreQuery('fetch');

    let content;
    if(isFetching){
        content = <Skeleton />
    }else if(data){
        content = 
        <div className="w-screen h-full justify-center items-center flex flex-col px-10 py-8 mt-8">
            <h1 className="text-3xl font-bold">Product</h1>
            <div className="overflow-x-auto mt-2 sm:-mx-6 items-center lg:-mx-8">
                <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="w-full flex flex-row justify-between mb-3">
                        <div className="flex w-2/6">
                            <input
                                type="text"
                                id="form-subscribe-Filter"
                                className="mr-4 rounded-lg border-transparent flex-1 appearance-none border border-gray-400 w-40 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                                placeholder="ค้นหา"
                            />
                        </div>
                        <Link to='create'>
                            <Button  
                                className="flex justify-center items-center text-white bg-blue-800"
                            >
                                Create
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </Button>
                        </Link>
                    </div>
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center">
                        <thead className="border-b bg-blue-900">
                            <tr>
                            <th
                                scope="col"
                                className="text-sm font-medium text-white px-6 py-4"
                            >
                                #
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-lg text-white px-6 py-4"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-lg text-white px-6 py-4"
                            >
                                Expiry Date
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-lg text-white px-6 py-4"
                            >
                                Round
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-lg text-white px-6 py-4"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-lg text-white px-6 py-4"
                            >
                                Action
                            </th>
                            </tr>
                        </thead>
                        <tbody className="border-black border-b-2">
                            <tr>
                                <td className="px-3">
                                    Lorem ipsum
                                </td>
                                <td className="px-3">
                                    Aenean dignissim 
                                </td>
                                <td className="px-3">
                                    Aliquam at erat 
                                </td>
                                <td className="px-3">
                                    Phasellus nec 
                                </td>
                                <td className="px-3">
                                    imperdiet massa 
                                </td>
                                <td className="px-3">
                                    gravida leo id dui
                                </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Authentication Error',
            text: `You don't have permission to view this page`,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: true,
        });
        return <Navigate to='/'  />
    }

    return ( 
        <>
            {content}
        </>
     );
}

export default Product;