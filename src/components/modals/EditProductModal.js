import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ProductContext } from "../../context/api/ProductContext";

export default function EditProductModal() {
    const { setUpdatedName,
        updatedName,
        updatedPrice,
        setUpdatedPrice,
        setUpdatedGenre,
        updatedGenre,
        UpdateOne
    } = useContext(ProductContext)



    const navigate = useNavigate()

    const handleClose = () => navigate('/product-management');

    const id = window.location.pathname.split('/')[3]

    const newData = {
        name: updatedName,
        price: Number(updatedPrice),
        genre: updatedGenre
    }

    console.log(id)

    const handleUpdate = async () => {
        try {
            UpdateOne(id, newData)
            navigate('/product-management');

        } catch (error) {
            console.error(error)
        }
    }



    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>

            </Button> */}

            <Modal
                show={true}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <input type="text" onChange={(e) => setUpdatedName(e.target.value)} value={updatedName} className="form-control" placeholder="Enter Product Name" id="inputGroupFile02" />
                        </div>

                        <div className="input-group mb-3">
                            <input type="number" onChange={(e) => setUpdatedPrice(e.target.value)} value={updatedPrice} className="form-control" placeholder="Enter Product Price" id="inputGroupFile02" />
                        </div>

                        <div class="input-group mb-3">

                            <select class="form-select" id="inputGroupSelect01" onChange={(e) => setUpdatedGenre(e.target.value)} value={updatedGenre}  >
                                <option value="snacks_nonveg">Snacks Non-Veg</option>
                                <option value="snacks_veg">Snacks Veg</option>
                                <option value="drinks">Drinks</option>
                                <option value="alcohol">Alcohol</option>
                                <option value="dessert">Dessert</option>
                                <option value="extra">Extra</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="secondary" onClick={handleUpdate}>Edit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}