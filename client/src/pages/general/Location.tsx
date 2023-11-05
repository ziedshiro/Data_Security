import { useFetchLocationQuery } from "../../store";

function Location() {
    const { data, isFetching, error } = useFetchLocationQuery("");
    console.log(data)

    return ( 
        <div>
        <main className="grid place-items-center bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
            <div className="kanit mt-4 block bg-white border border-gray-200 rounded-xl shadow-md">
              <div className="flex mb-7">
                  <p className="text-xl font-semibold">ราคารวม</p>
                  <input/>
              </div>
              <div className="text-white bg-red-500 flex justify-center rounded-full text-sm py-3 mx-6 cursor-pointer" >ชำระเงิน</div>
            </div>
        </main>
      </div>
     );
}

export default Location;