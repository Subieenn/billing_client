import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function EditRoomModal() {
    const newData = {
        name: updatedName,
        price: Number(updatedPrice),
        genre: updatedGenre
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
                            <input type="number" onChange={(e) => setUpdatedName(e.target.value)} value={updatedNumber} className="form-control" placeholder="Enter Room Number" id="inputGroupFile02" />
                        </div>

                        <div className="input-group mb-3">
                            <input type="text" onChange={(e) => setUpdatedName(e.target.value)} value={updatedName} className="form-control" placeholder="Enter Room Name" id="inputGroupFile02" />
                        </div>

                        <div className="input-group mb-3">
                            <input type="number" onChange={(e) => setUpdatedPrice(e.target.value)} value={updatedPrice} className="form-control" placeholder="Enter Room Price" id="inputGroupFile02" />
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