import { ChangeEvent, useState } from "react";

function Payment() {

    const [agreeToPolicy, setAgreeToPolicy] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = () => {
    }

    const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          if (file.type === 'image/jpeg' || file.type === 'image/png') {
            setFile(file);
            setAgreeToPolicy(!agreeToPolicy)
          } else {
            alert('Please select a valid image file (JPEG or PNG).');
          }
        }
    };

    return ( 
        <></>
        // <div className="container mx-auto my-10">
        //     <div className="border shadow mx-auto max-w-7xl mb-10 rounded-md">
        //     </div>
        //     { courtLoading || imgBuildingLoading || courtError || imgBuildingError || isFetching || error ? <PaymentSkeleton/>
        //     :
        //     <div className="max-w-7xl mx-auto border shadow px-10 py-5 rounded-md">
        //         <div className="px-6 pb-16 pt-10">
        //             <div>
        //                 <h1 className="border-l-8 mb-2 border-green-700 pl-3 text-2xl font-bold">รหัสยืนยันการจอง NO. </h1>
        //             </div>

        //             <div className="flex flex-col items-center border-b-2 mt-10 ">

        //                 <img className="w-72 border-x-2 border-t-2 rounded-t-md" src={require(`../../img/thai_qr_payment.png`)} alt="logo"/>
        //                 {isFetching || error ?
        //                 <div className="border-x-2 border-b-2 w-72 rounded-b-md py-8 flex justify-center">
        //                   <span className="border-x-2 border-y-2 w-56 h-56 flex justify-center items-center">
        //                       <CircularProgress /> 
        //                   </span>
        //                 </div> 
        //                 : 
        //                   <img className="border-x-2 border-b-2 w-72 rounded-b-md" src={data.results} alt="QRCode"/>}
        //                 <p className="mt-5 text-xl font-bold">KU KPS SPORT</p>
        //                 <div className="text-center py-5">
        //                     <div className="text-lg font-bold mt-4 flex items-center text-red-500">
        //                         <GoStopwatch className="mr-3 text-xl font-bold"/> {formattedMinutes}:{formattedSeconds}
        //                     </div>
        //                 </div>
                        
        //             </div>

        //             <div className="mt-10 border-b-2 flex">
        //               <img className="w-56 mb-10 rounded-lg" src={require(`C:/backend_image/Building/${imgBuilding[0]?.path}`)} alt={imgBuilding[0]?.path}/>
        //               <h1 className="ml-8 text-xl font-medium">{court?.building?.sport?.name} / {court?.building?.name} / {court?.name}</h1>
        //             </div>

        //             <div className="grid grid-rows-2 grid-flow-col gap-4 border-b-2 py-8">
        //               <label className="text-green-700 font-bold">วัน / เวลา การจอง</label>
        //               <div></div>
        //               <label className="font-bold">วันที่</label>
        //               <h1>{currentDate.getDate()}/{currentDate.getMonth()+1}/{currentDate.getFullYear()}</h1>
        //               <label className="font-bold">รอบ</label>
        //               <h1>{sharedValue?.timestart.replace(/:\d{2}$/, '')}-{sharedValue?.timeend.replace(/:\d{2}$/, '')}</h1>
        //             </div>

                    
        //             <div className="grid grid-rows-2 grid-flow-col gap-4 border-b-2 py-8">
        //               <label className="text-green-700 font-bold">ข้อมูลการจอง</label>
        //               <div></div>
        //               <label className="font-bold">ชื่อ</label>
        //               <h1>{user?.firstname}</h1>
        //               <label className="font-bold">นาสกุล</label>
        //               <h1>{user?.lastname}</h1>
        //             </div>

                    
        //             <div className="grid grid-rows-1 grid-flow-col gap-4 border-b-2 py-8">
        //               <label className="text-green-700 font-bold">ราคา</label>
        //               <h1 className="ml-8">{court?.building?.sport?.price} บาท</h1>
        //               <div></div>
        //             </div>

        //             <div>
        //                 <div className="flex justify-center mt-16">
        //                   <input
        //                     type="file"
        //                     accept=".jpg, .jpeg, .png" // Specify accepted image file types
        //                     onChange={handlePhotoUpload}
        //                   />
        //                 </div>
        //                 <form onSubmit={handleSubmit} className="mt-5 flex justify-center items-center">
        //                   <button
        //                       type="submit"
        //                       disabled={!agreeToPolicy}
        //                       className={`${agreeToPolicy ? 'bg-opacity-100 cursor-pointer bg-green-600 hover:bg-green-700' : 'bg-opacity-50 cursor-not-allowed bg-gray-500'} 
        //                       mt-10 flex w-64 items-center justify-center rounded-2xl border border-transparent px-8 py-3 text-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
        //                   >
        //                       ยืนยัน
        //                   </button>
        //                   <a href="/" className="cursor-pointer mt-10 ml-10 p-0">
        //                       ยกเลิก
        //                   </a>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>}
        // </div>
    );
}

export default Payment;