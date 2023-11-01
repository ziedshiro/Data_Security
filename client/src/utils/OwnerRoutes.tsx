import { useFetchAuthStoreQuery } from '../store';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router';
import { Skeleton } from '@mui/joy';
import Store from '../pages/store/Store';
import Cookies from 'js-cookie';

function OwnerRoutes() {

    const { data,isFetching } = useFetchAuthStoreQuery();
    
    let content;
    if(isFetching){
        content = <Skeleton />
    }else if(data){
        content = <Store {...data}/>
        
    }else{
        Cookies.remove('jwt');
        Cookies.remove('userData')
        Swal.fire({
            icon: 'error',
            title: 'Authentication Error',
            text: `Time Out`,
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