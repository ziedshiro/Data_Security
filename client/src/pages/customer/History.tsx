import { useState } from "react";
import { useFetchHistoryQuery } from "../../store";
import { Skeleton } from "@mui/joy";

function History() {
    const { data, isFetching, error } = useFetchHistoryQuery("");

    const [selectedStatus, setSelectedStatus] = useState('All');
    // const filteredData = data?.filter((item) =>
    //     (selectedStatus === 'All' || item.status === selectedStatus)
    // );
    return ( 
        <div className="bg-gray-50">
            <div className="container max-w-7xl px-4 mx-auto sm:px-8">
                <div className="py-8">
                    <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
                        <h2 className="text-2xl leading-tight font-semibold text-gray-600">
                            Order
                        </h2>
                        <div className="text-end mt-5">
                            <select
                                className="rounded-lg border-transparent flex-1 border-2 border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="Approved">Approve</option>
                                <option value="Waiting">Waiting</option>
                                <option value="Reject">Reject</option>
                            </select>
                        </div>
                    </div>
                    <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            no.
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            วันที่
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            จำนวนเงิน
                                        </th>
                                        <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            สถานะ
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* { isFetching || error ? 
                                        <tr className="bg-white border-b-2 border-black">
                                            <td colSpan={10}>
                                                <Skeleton className='px-5 py-5 my-4' variant="text" level="h1" />
                                                <Skeleton className='px-5 py-5 my-4' variant="text" level="h1" />
                                                <Skeleton className='px-5 py-5 my-4' variant="text" level="h1" />
                                            </td>
                                        </tr> :
                                    ( filteredData.map((data, index) => (
                                    <tr key={data.reserveId}>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {data.reserveId}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                            {data.court.building.name} / {data.court.building.sport.name} / {data.court.name}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {data.date}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {data.timestart.split(":").slice(0, 2).join(":")} - {data.timeend.split(":").slice(0, 2).join(":")}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            { data.status === 'Approved' ?
                                                <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                                    </span>
                                                    <span className="relative">
                                                        Approve
                                                    </span>
                                                </span> 
                                                : data.status === 'Waiting' ?
                                                <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-yellow-900">
                                                    <span aria-hidden="true" className="absolute inset-0 bg-yellow-200 rounded-full opacity-50"></span>
                                                    <span className="relative">
                                                        Waiting
                                                    </span>
                                                </span>
                                                :
                                                <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-red-900">
                                                    <span aria-hidden="true" className="absolute inset-0 bg-red-200 rounded-full opacity-50"></span>
                                                    <span className="relative">
                                                        Reject
                                                    </span>
                                                </span>
                                            }
                                        </td>
                                    </tr>
                                    )))} */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default History;