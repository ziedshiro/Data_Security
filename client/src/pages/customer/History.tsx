import { useState } from "react";
import { useFetchHistoryQuery } from "../../store";
import { Skeleton } from "@mui/joy";
import { HistoryData } from "../../Model/History";


function History() {
    const { data, isFetching, error } = useFetchHistoryQuery({});

    const [selectedStatus, setSelectedStatus] = useState('All');
    const filteredData = data?.filter((item :HistoryData) =>
        (selectedStatus === 'All' || item.orderStatus === selectedStatus)
    );
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
                                <option value="Pending">Pending</option>
                                <option value="Failed">Failed</option>
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
                                            ชื่อร้านค้า
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
                                    {isFetching || error ?
                                        <tr className="bg-white border-b-2 border-black">
                                            <td colSpan={10}>
                                                <Skeleton className='px-5 py-5 my-4' variant="text" level="h1" />
                                                <Skeleton className='px-5 py-5 my-4' variant="text" level="h1" />
                                                <Skeleton className='px-5 py-5 my-4' variant="text" level="h1" />
                                            </td>
                                        </tr> :
                                        (filteredData.map((data: HistoryData, index: number) => (
                                            <tr key={data.orderId}>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <div className="flex items-center">
                                                        <div className="ml-3">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {data.orderId}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                               
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {data.store.name}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {data.orderDate.split(":").slice(0, 2).join(":")} - {data.orderDate.split(":").slice(0, 2).join(":")}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {data.totalAmount}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    {data.orderStatus === 'Pending' && data.paymentStatus === 'Pending' ?
                                                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                                            <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                                            </span>
                                                            <span className="relative">
                                                                ปฎิเสธการชำระเงิน
                                                            </span>
                                                        </span>
                                                        : data.orderStatus === 'Failed' && data.paymentStatus === 'Reject' ?
                                                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-yellow-900">
                                                                <span aria-hidden="true" className="absolute inset-0 bg-yellow-200 rounded-full opacity-50"></span>
                                                                <span className="relative">
                                                                    ปฎิเสธการชำระเงิน
                                                                </span>
                                                            </span>
                                                            : data.orderStatus === 'Pending' && data.paymentStatus === 'Approve' && data.pickupStatus === 'pending' ?
                                                                <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-yellow-900">
                                                                    <span aria-hidden="true" className="absolute inset-0 bg-yellow-200 rounded-full opacity-50"></span>
                                                                    <span className="relative">
                                                                        รอไปเอาหน้าร้าน
                                                                    </span>
                                                                </span>
                                                                : data.orderStatus === 'Failed' && data.paymentStatus === 'Approve' && data.pickupStatus === 'Failed' ?
                                                                    <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-yellow-900">
                                                                        <span aria-hidden="true" className="absolute inset-0 bg-yellow-200 rounded-full opacity-50"></span>
                                                                        <span className="relative">
                                                                            ไม่ได้รับสินค้า
                                                                        </span>
                                                                    </span>
                                                                    : 
                                                                    <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-red-900">
                                                                        <span aria-hidden="true" className="absolute inset-0 bg-red-200 rounded-full opacity-50"></span>
                                                                        <span className="relative">
                                                                            รับสินค้าแล้ว
                                                                        </span>
                                                                    </span>
                                                    }
                                                </td>
                                            </tr>
                                        )))}
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