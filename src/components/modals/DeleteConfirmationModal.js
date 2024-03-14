import axios from "axios"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ProductContext } from "../../context/api/ProductContext";


export default function DeleteConfirmationModal() {
    // const [name, setName] = useState("")
    // const [price, setPrice] = useState(NaN)
    // const [genre, setGenre] = useState("")
    const navigate = useNavigate()
    const {DeleteProduct} = useContext(ProductContext)

    const handleClose = () => navigate('/product-management');

    const id = window.location.pathname.split('/')[3]

    const handleDelete = async () => {
        try {
            DeleteProduct(id)
            navigate('/product-management')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <Modal
                show={true}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are You sure you want to delete ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}