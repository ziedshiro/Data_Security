import { ReactNode } from 'react';
import { useFetchAuthStoreQuery } from '../store';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router';
import { Skeleton } from '@mui/joy';
import Store from '../pages/store/Store';
import { StoreAuth } from '../Model/Store'
import { store } from '../store/index';

function OwnerRoutes() {

    const { data,isFetching } = useFetchAuthStoreQuery();
    
    let content;
    if(isFetching){
        content = <Skeleton />
    }else if(data){
        content = <Store {...data}/>
        
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

export default OwnerRoutes;