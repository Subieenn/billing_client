import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/api/ProductContext";


export default function SingleProductManagement(props) {
    const {FindOne} = useContext(ProductContext)

    const handleEdit = async () => {
        FindOne(props.data._id)
    }

    return (
        <>
            <div className="product">
                <div className="info">
                    <h6 className="name">{props.name}</h6>
                    <h6 className="price">Nrs. {props.price}</h6>
                </div>
                <div className="buttons">
                    <Link className="btn btn-secondary edit" to={`/product-management/edit/${props.data._id}`} onClick={handleEdit}><i class="fi fa-regular fa-pen-to-square"></i> Edit</Link>
                    <Link className="btn delete edit" to={`/product-management/delete/${props.data._id}`} ><i class="fi fa-regular fa-pen-to-square"></i> Delete</Link>
                </div>
            </div>

        </>
    )
}