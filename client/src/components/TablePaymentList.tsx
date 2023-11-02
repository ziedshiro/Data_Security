import { EyeIcon } from "@heroicons/react/24/outline";
import thaiDateFormat from "../utils/thaiDateFormat";
import { useState } from "react";
import { Payment } from "../Model/Payment";
import { useFetchPaymentQuery } from "../store";
import { Skeleton } from "@mui/joy";
import ModalApprovePayment from "./ModalApprovePayment";


function TablePaymentList() {
    const { data,isFetching  } = useFetchPaymentQuery('') as {
        data:Array<Payment>,
        isFetching:Boolean
    };
    const [viewPayment,setViewPayment] = useState(false);

    let content;
    if(isFetching){
        content = 
            <tr>
                <td>
                    <Skeleton width={726} height={500}/>
                </td>
            </tr>
    }else if(data.length > 0){
        content = data.map((item:Payment)=>{
            return(
                <tr key={item.orderId}>
                    <td className="px-3 text-start">
                        {thaiDateFormat(item.orderDate)}
                    </td>
                    <td className="px-3">
                        {thaiDateFormat(item.paymentDate)}
                    </td>
                    <td className="px-3">
                        {item.totalAmount}
                    </td>
                    <td className="px-3">
                        {item.orderStatus}
                    </td>
                    <td className="px-3">
                        {item.paymentStatus}
                    </td>
                    <td className="px-3 py-2 flex">
                        <EyeIcon onClick={()=>setViewPayment(true)} height={25} className="hover:text-yellow-600 cursor-pointer mr-1"/>
                        <ModalApprovePayment 
                            onHide={()=>setViewPayment(false)}
                            open={viewPayment}
                            payment={item}
                        />
                    </td>
                </tr>
            )
        })
    }else{
        content = 
            <tr>
                <td>No Data</td>
            </tr>
    }
    return (
        <>
            {content}
        </>
        
    )
}

export default TablePaymentList;