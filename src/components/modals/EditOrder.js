import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../../context/api/OrderContext';


export default function EditOrder({ getOneOrderModel, setGetOneOrderModel }) {
    const { FetchOneOrder, oneOrder } = useContext(OrderContext)
    const navigate = useNavigate()

    const { ordersAfterDates } = useContext(OrderContext)

    const handleClose = () => {
        navigate('/dashboard')
    };

    const id = window.location.pathname.split('/')[3]

    useEffect(() => {
        FetchOneOrder(id)
    }, [oneOrder])


    const [count, setCount] = useState(null);
    return (
        <>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className='px-0 py-0'>
                    <table className="order-details-table">
                        <thead>
                            <tr>
                                <th className="text-start fw-500" scope="col">Item</th>
                                <th className="text-center fw-500" scope="col">Qty</th>
                                <th className="text-end fw-500" scope="col">Price</th>
                            </tr>
                        </thead>
                        {oneOrder?.orders?.map((order) => (
                            <tr key={order._id}>
                                <td className='text-start'>{order.productsName}</td>
                                <td className='text-center'> 
                                {setCount(order.quantity)}    
                                <button onClick={() => count > 1 && setCount(count - 1)} className="btn fw-700">-</button>
                                    <input value={count} onChange={(e) => setCount(e.target.value)} className="form-control text-center fw-500 text-secondary" type="text" />
                                    <button onClick={() => setCount(count + 1)} className="btn fw-700">+</button></td>
                                <td className='text-end'>Nrs {order.price}</td>
                            </tr>
                        ))
                        }

                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

