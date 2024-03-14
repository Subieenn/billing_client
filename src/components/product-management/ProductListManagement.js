import AddProduct from "./AddProduct";
import { useContext, useEffect } from "react";

import SingleProductManagement from "./SingleProductManagement";
import { ProductContext } from "../../context/api/ProductContext";

export default function ProductListManagement(props){
    const {FetchProducts, productData} = useContext(ProductContext)

    return(
        <>
        <div className="products-list">
            <AddProduct />
            {
                productData?.map((food)=>{
                    return(
                        food.genre === (props.genre)
                        &&
                        <SingleProductManagement key={food._id} name={food.name} price={food.price} data={food}/>
                    )
                })
            }
        </div>
        </>
    )
}