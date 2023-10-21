import { useNavigate } from "react-router-dom";

function Success() {
    const navigate = useNavigate();

    const handleSubmit = () =>{

    }

    return ( 
        <>
        </>
    // <div className="container mx-auto my-10">
    //     { error || isFetching || imgBuildingLoading || imgBuildingError ? <SuccessSkeleton/>
    //     :
    //     <>
    //         <div className="border shadow mx-auto max-w-7xl mb-10 rounded-md">
    //             <Status status={3}/>
    //         </div>
            
    //         <div className="max-w-7xl mx-auto border shadow px-10 py-5 rounded-md mb-10">
    //             <div className="flex flex-col items-center">
    //                 <GoCheckCircle className="text-7xl text-green-500 "/>
    //                 <h1 className="p-5 font-bold text-xl">การจองเสร็จสมบูรณ์ !</h1>
    //                 <p className="font-semibold text-gray-400">ระบบจะทำการส่งรายละเอียดการจองไปยังเจ้าหน้าที่</p>
    //                 <p className="font-semibold p-5 text-yellow-600">โปรดรอการอนุมัติ</p>
    //             </div>
    //         </div>

    //         <div className="max-w-7xl mx-auto border shadow px-10 py-5 rounded-md">
    //             <div className="px-6 pb-16 pt-10">
    //                 <div>
    //                     <h1 className="border-l-8 mb-2 border-green-700 pl-3 text-2xl font-bold">รหัสยืนยันการจอง NO. {id}</h1>
    //                 </div>

    //                 <div className="mt-10 border-b-2 flex">
    //                 <img className="w-56 mb-10 rounded-lg" src={require(`C:/backend_image/Building/${imgBuilding[0]?.path}`)} alt={imgBuilding[0]?.path}/>
    //                 <h1 className="ml-8 text-xl font-medium">{data?.court?.building?.sport?.name} / {data?.court?.building?.name} / {data?.court?.name}</h1>
    //                 </div>

    //                 <div className="grid grid-rows-2 grid-flow-col gap-4 border-b-2 py-8">
    //                 <label className="text-green-700 font-bold">วัน / เวลา การจอง</label>
    //                 <div></div>
    //                 <label className="font-bold">วันที่</label>
    //                 <h1>{currentDate.getDate()}/{currentDate.getMonth()+1}/{currentDate.getFullYear()}</h1>
    //                 <label className="font-bold">รอบ</label>
    //                 <h1>{data?.timestart.replace(/:\d{2}$/, '')}-{data?.timeend.replace(/:\d{2}$/, '')}</h1>
    //                 </div>

                    
    //                 <div className="grid grid-rows-2 grid-flow-col gap-4 border-b-2 py-8">
    //                 <label className="text-green-700 font-bold">ข้อมูลการจอง</label>
    //                 <div></div>
    //                 <label className="font-bold">ชื่อ</label>
    //                 <h1>{user.firstname}</h1>
    //                 <label className="font-bold">นาสกุล</label>
    //                 <h1>{user.lastname}</h1>
    //                 </div>

                    
    //                 <div className="grid grid-rows-1 grid-flow-col gap-4 border-b-2 py-8">
    //                 <label className="text-green-700 font-bold">ราคา</label>
    //                 <h1 className="ml-8">{data?.court?.building?.sport?.price} บาท</h1>
    //                 <div></div>
    //                 </div>

    //                 <div>
    //                     <form onSubmit={handleSubmit} className="mt-5 flex justify-center items-center">
    //                     <button
    //                         type="submit"
    //                         className='bg-opacity-100 cursor-pointer bg-green-600 hover:bg-green-700 mt-10 flex w-64 items-center justify-center rounded-2xl border border-transparent px-8 py-3 text-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
    //                     >
    //                         ตกลง
    //                     </button>
    //                     </form>
    //                 </div>
    //             </div>
    //         </div>
    //     </>}
    // </div>
     );
}

export default Success;