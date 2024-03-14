
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { OrderContext } from "../../context/api/OrderContext";
import { useContext } from "react";
import { TableContext } from "../../context/api/TableContext";
import _ from "lodash"


export default function CloseTableModal({ discount, notes, superDeluxe, deluxe }) {
    // const [name, setName] = useState("")
    // const [price, setPrice] = useState(NaN)
    // const [genre, setGenre] = useState("")
    const navigate = useNavigate()
    const id = window.location.pathname.split('/')[2]
    const { AddOrdersData, openModal, openModalFun } = useContext(OrderContext)

    const { oneTable, totalAmountInArray, deleteAllOrders } = useContext(TableContext)


    const handleClose = () => {
        openModalFun(false)
        navigate(`/pos/${id}`)
    };
    const totalAmount = totalAmountInArray();


    // console.log(oneTable)
    const handleSubmit = async () => {
        try {
            // DeleteProduct(id)

            if (oneTable.tableOrders.length > 0) {
                AddOrdersData({
                    tableNo: oneTable.tableNo,
                    orders: oneTable.tableOrders,
                    totalPrice: ((_.sum(totalAmount) + superDeluxe + deluxe) - discount),
                    notes: notes
                })

                deleteAllOrders(id)
                openModalFun(false)
                navigate(`/`)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Modal
                show={openModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Close Table</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are You sure you want to close this table ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="secondary" onClick={handleSubmit}>Close Table</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}