import { useContext, useState } from "react";
import { TableContext } from "../../context/api/TableContext";

export default function SingleProduct(props) {
    const [count, setCount] = useState(1);

    const {addOrders}= useContext(TableContext)

    const id = window.location.pathname.split('/')[2]


    const handleAdd = ()=>{
        addOrders(id,{
            productsId: props.productId,
            productsName:props.name,
            quantity: Number(count),
            price: Number(props.price)*Number(count),
            orderId: "123"
        })
    }


    return (
        <>
            <div className="single-product">
                <div className="info">
                    <h6 className="name">{props.name}</h6>
                    <h6 className="price">Nrs. {props.price}</h6>
                    <div className="d-flex counter">
                        <button  onClick={() => count > 1 && setCount(count - 1)} className="btn fw-700">-</button>
                        <input value={count} onChange={(e)=> setCount(e.target.value)} className="form-control text-center fw-500 text-secondary" type="text" />
                        <button onClick={() => setCount(count + 1)} className="btn fw-700">+</button>
                    </div>
                </div>
                <button className="btn btn-secondary" onClick={handleAdd}> Add</button>
            </div>
        </>
    )
}