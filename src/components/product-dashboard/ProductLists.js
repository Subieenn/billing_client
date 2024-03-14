import { useContext, useEffect } from "react";
import { ProductContext } from "../../context/api/ProductContext";
import useFetch from "../../hooks/useFetch";
import SingleProduct from "./SingleProduct";

export default function ProductList(props) {
    const { productData } = useContext(ProductContext)

    return (
        <>
            <div className="products-list-pos">
                {
                    productData.map((food) => {
                        return (
                            food.genre === (props.genre) || (props.genre === 'all')
                                ?
                                <SingleProduct key={food._id} name={food.name} price={food.price} productId={food._id} />
                                :
                                null
                        )
                    })
                }
            </div>
        </>
    )
}