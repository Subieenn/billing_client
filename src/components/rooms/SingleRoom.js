
import { Link } from "react-router-dom";

export default function SingleRoom({cat, price}) {

    return (
        <>
            <div className="product">
                <div className="info">
                {/* <h6 className="room-number fs-16 fw-600">106</h6> */}
                    <h6 className="room-name fs-18 mb-2">{cat}</h6>
                    <h6 className="price">Nrs. {price}</h6>
                </div>
                <div className="buttons">
                    <Link className="btn btn-secondary edit"><i class="fi fa-regular fa-pen-to-square"></i> Edit</Link>
                </div>
            </div>

        </>
    )
}