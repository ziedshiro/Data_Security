import { floated } from "@material-tailwind/react/types/components/card"


export interface CreateProduct {
    store?:{
        storeId:number
    },
    type?:{
        typeId:number
    },
    name:string,
    description:string,
    expiryDate:string,
    price:floated,
    discountPrice:floated,
    quantityAvailable:number
}