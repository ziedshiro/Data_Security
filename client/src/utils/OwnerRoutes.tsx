import { ReactNode } from 'react';
import { useFetchAuthStoreQuery } from '../store';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router';
import { Skeleton } from '@mui/joy';

function OwnerRoutes({ children }: { children: ReactNode }) {
    const { data,isFetching } = useFetchAuthStoreQuery('fetch');

    let content;
    if(isFetching){
        content = <Skeleton />
    }else if(data){
        content = children;
        
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