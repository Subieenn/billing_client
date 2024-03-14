import { Link } from "react-router-dom";

export default function AddProduct() {
    return (

        <>
            <Link className="product"  to={"/product-management/add"}>
                <div className="h-100 d-flex flex-column justify-content-center text-info">
                    <div className="info">
                        <i className="fa-solid fa-plus mb-3 "></i>
                        <h6 className="name mt-2 text-info">Add New Dish</h6>
                    </div>
                </div>
            </Link>
        </>
    )
}