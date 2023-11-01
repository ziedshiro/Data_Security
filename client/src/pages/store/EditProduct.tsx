import { Navigate,useLocation } from 'react-router-dom';
import { Skeleton } from '@mui/joy';
import { useFetchAuthStoreQuery,useUpdateProductMutation,useFetchProductByIdQuery } from "../../store";
import Swal from "sweetalert2";
import { ProductData } from '../../Model/Product';
import EditProductList from '../../components/EditProductList';

function EditProduct() {
    const productId = useLocation().pathname.split('/store/product/');
    const [ updateProduct ] = useUpdateProductMutation();
    const { data,isFetching } = useFetchAuthStoreQuery();
    const { data:product,isFetching:isProductFetch } = useFetchProductByIdQuery(productId[1])  as {
        data: ProductData;
        isFetching: boolean;
    };

    let content;
    if(isFetching || isProductFetch){
        content = <Skeleton />
    }else if(data){
        console.log(data);
        
        const newInitialValues = {
            type: product.type.typeName,
            name: product.name,
            description: product.description,
            expiryDate: product.expiryDate,
            price: product.price,
            discountPrice: product.discountPrice,
            quantityAvailable: product.quantityAvailable,
            file: [],
        };
        // formik.setValues(newInitialValues);
        content = <EditProductList product={product} storeId={data.storeId}/>
            
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

export default EditProduct;