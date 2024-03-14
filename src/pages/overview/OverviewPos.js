import { Link, Outlet } from "react-router-dom";
import Tabbar from "../../components/tabbar/Tabbar";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProductList from "../../components/product-dashboard/ProductLists";
import Search from "../../components/search/Search";
import { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "../../context/api/ProductContext";
import { TableContext } from "../../context/api/TableContext";
import _ from "lodash"
import CloseTableModal from "../../components/modals/CloseTableModal";
import { OrderContext } from "../../context/api/OrderContext";
import ReactToPrint from "react-to-print";
import { RoomContext } from "../../context/api/RoomContext";


export default function OverviewPos() {
    const [notes, setNotes] = useState("")
    const [deluxe, setDeluxe] = useState(0)
    const [superDeluxe, setSuperDeluxe] = useState(0)

    const { Search, FetchProducts } = useContext(ProductContext)
    const { FetchOneTable, oneTable, deleteOrders, totalAmountInArray } = useContext(TableContext)
    const { openModalFun, ordersData, FetchOrdersData } = useContext(OrderContext)
    const { FetchRoomData, roomData } = useContext(RoomContext)


    const handleSrch = (e) => {
        console.log(e.target.value)
        Search(e.target.value)
    }
    const id = window.location.pathname.split('/')[2]

    const handleCancleOrder = (productId) => {
        deleteOrders(id, productId)
    }

    const handleCloseTable = () => {
        openModalFun(true)
    }
    useEffect(() => {
        FetchOneTable(id)
    }, [oneTable])

    useEffect(() => {
        FetchProducts()
        FetchOrdersData()
        FetchRoomData()
    }, [])

    const [discount, setDiscount] = useState(0)
    const discountRef = useRef()

    function calculateDiscount() {
        const discountpercent = discountRef.current.value

        if (discountpercent <= 100 && discountpercent >= 0) {
            const discountAmount = (discountpercent / 100)

            setDiscount(Math.round(_.sum(totalAmount) * discountAmount))
        }
        if (discountpercent > 100) {
            setDiscount(_.sum(totalAmount))
        }
        if (discountpercent < 0) {
            setDiscount(0)
        }
    }

    const totalAmount = totalAmountInArray();

    const componentRef = useRef();

    // date
    var today = new Date()
    const time = new Intl.DateTimeFormat('default',
        {
            hour12: true,
            hour: 'numeric',
            minute: 'numeric'
        }).format(today);
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const handleNotes = (e) => {
        setNotes(e.target.value)
    }


    //hardcore for room price

    useEffect(() => {
        if (oneTable?.type === 'table') {
            setDeluxe(0)
            setSuperDeluxe(0)
        }
        else if (oneTable?.tableNo === 501) {
            setDeluxe(roomData[0]?.deluxe)
            setSuperDeluxe(0)
        } else if (oneTable?.tableNo === 502) {
            setDeluxe(roomData[0]?.deluxe)
            setSuperDeluxe(0)

        } else if (oneTable?.tableNo === 503) {
            setSuperDeluxe(roomData[0]?.superdeluxe)
            setDeluxe(0)

        } else if (oneTable.tableNo === 504) {
            setSuperDeluxe(roomData[0]?.superdeluxe)
            setDeluxe(0)
        }

    }, [oneTable])

    return (
        <>
            <CloseTableModal discount={discount} notes={notes} superDeluxe={superDeluxe} deluxe={deluxe} />
            <div className="page-container">
                <div className="pos-grid h-100">
                    <div className=" h-md-100 tab-side">
                        <Tabbar overview="active" />
                    </div>

                    <div className="pos-products h-100 content-page">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex ">
                                <h3 className="main-header fs-22 py-2 pb-3 fw-600">Table No. {oneTable.tableNo}</h3>
                            </div>
                            {/* search */}

                            <div className="input-group mb-3 search-bar">
                                <input type="text" className="form-control" placeholder="Search for products.." aria-label="Search for products.." aria-describedby="basic-addon2" onChange={handleSrch} />
                                <span className="input-group-text" type="button" id="basic-addon2"><i className="fa-solid fa-magnifying-glass text-white"></i></span>
                            </div>


                        </div>
                        <div>
                            <Tabs
                                defaultActiveKey="all"
                                id="uncontrolled-tab-example"
                                className="mb-3 h-100"
                            >
                                <Tab eventKey="all" title="All">
                                    <ProductList genre="all" />
                                </Tab>
                                <Tab eventKey="non-veg" title="Snacks Non-veg">
                                    <ProductList genre="snacks_nonveg" />
                                </Tab>
                                <Tab eventKey="veg" title="Snacks Veg">
                                    <ProductList genre="snacks_veg" />
                                </Tab>
                                <Tab eventKey="drinks" title="Drinks">
                                    <ProductList genre="drinks" />
                                </Tab>
                                <Tab eventKey="alcohol" title="Alcohol">
                                    <ProductList genre="alcohol" />
                                </Tab>
                                <Tab eventKey="dessert" title="Dessert">
                                    <ProductList genre="dessert" />
                                </Tab>
                                <Tab eventKey="extra" title="Extra">
                                    <ProductList genre="extra" />
                                </Tab>
                            </Tabs>
                        </div>
                    </div>


                    <div className="billing scrollbar h-100 content-page">
                        <h3 className="heading fw-500 fs-17 mb-3"><span></span></h3>
                        <div className="table-div scrollbar">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="text-primary fw-bold" scope="col">Item</th>
                                        <th className="text-primary fw-bold" scope="col">Qty</th>
                                        <th className="text-primary fw-bold" scope="col">Price</th>
                                        <th  className="text-primary fw-bold"scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {oneTable.type === 'room' && <tr>
                                        <td>Room Price</td>
                                        <td>1</td>
                                        {oneTable.tableNo === 501 && <td>{deluxe}</td>}
                                        {oneTable.tableNo === 502 && <td>{deluxe}</td>}
                                        {oneTable.tableNo === 503 && <td>{superDeluxe}</td>}
                                        {oneTable.tableNo === 504 && <td>{superDeluxe}</td>}
                                    </tr>}
                                    {oneTable?.tableOrders?.map((order) => {
                                        return (
                                            <tr key={order._id}>
                                                <td>{order.productsName}</td>
                                                <td>{order.quantity}</td>
                                                <td>{order.price}</td>
                                                {/* <td style={{ cursor: "pointer" }} onClick={() => handleCancleOrder(order._id)}><i className="del text-primary fa-solid fa-delete-left"></i></td> */}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="billing-conclusion">
                            <div class="form-floating scrollbar">
                                <textarea class="form-control" placeholder="Leave a comment here" id="notes" onChange={handleNotes}></textarea>
                                <label for="notes">Notes</label>
                            </div>

                            <div class="input-group mb-0 ms-auto">

                                <input ref={discountRef} onChange={calculateDiscount} type="number" className="form-control mb-4" placeholder="Discount" />
                                <span class="input-group-text h-100" id="basic-addon2">%</span>
                            </div>

                            <div className="d-flex justify-content-between align-item-center">
                                <h5>Sub Total</h5>
                                <h6 className="text-dark fs-15">Nrs. {_.sum(totalAmount) + superDeluxe + deluxe}</h6>
                            </div>

                            <div className="d-flex justify-content-between align-item-center">
                                <h5>Discount</h5>
                                <h6 className="text-dark fs-15">Nrs. {discount}</h6>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-item-center">
                                <h5>Total</h5>
                                <h6 className="text-dark fs-15">Nrs. {(_.sum(totalAmount) + superDeluxe + deluxe) - discount}</h6>
                            </div>
                            <div className="d-flex align-items-center gap-1 mt-4">
                                <button className="btn btn-outline-primary w-50 fs-15" onClick={handleCloseTable}>
                                    Close Table
                                </button>

                                {/* <button className="btn btn-primary w-50">
                                    Print Receipt
                                </button> */}

                                <ReactToPrint
                                    trigger={() => {
                                        return <button className="btn btn-primary w-50 fs-15">
                                            Print Receipt
                                        </button>
                                    }}
                                    content={() => componentRef.current}
                                    pageStyle="print"
                                />
                                {/* Invoice */}
                                <div style={{ display: "none" }}>
                                    <div className="invoice" ref={componentRef}>
                                        <hr />
                                        <h4 className="text-center">Billing</h4>
                                        <hr />
                                        <div className="d-flex justify-content-between mb-2">
                                            <p className="fs-13">
                                                Date: {date}
                                            </p>
                                            <p className="fs-13">
                                                Time: {time}
                                            </p>
                                        </div>
                                        <div className="table-div-invoce">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th className="text-start" scope="col">Item</th>
                                                        <th scope="col">Qty</th>
                                                        <th className="text-end" scope="col">Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {oneTable?.tableOrders?.map((order) => {
                                                        return (

                                                            <tr className="mb-0" key={order._id}>
                                                                <td className="fs-13 text-start">{order.productsName}</td>
                                                                <td className="fs-13">{order.quantity}</td>
                                                                <td className="fs-13 text-end">{order.price}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                            {
                                                notes 
                                                && 
                                                <p className="my-3 border border-2 p-2 rounded-2">Notes: {notes}</p>
                                            }
                                            <div className="d-flex justify-content-between align-item-center">
                                                <h5 className="fs-15">Sub Total</h5>
                                                <h6 className="text-dark fs-15">Nrs. {_.sum(totalAmount)}</h6>
                                            </div>

                                            <div className="d-flex justify-content-between align-item-center">
                                                <h5 className="fs-15">Discount</h5>
                                                <h6 className="text-dark fs-15">Nrs. {discount}</h6>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between align-item-center">
                                                <h5 fs-15>Total</h5>
                                                <h6 className="text-dark fs-15">Nrs. {_.sum(totalAmount) - discount}</h6>
                                            </div>
                                            <div className="qr mt-3 d-flex justify-content-center">
                                                <img className="img-fluid " src="https://cdn.asparksys.com/medias/1675786592586.png" alt="qr" />
                                            </div>
                                            <p className="mt-3 text-center fs-14">9800949427</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Outlet />
            </div>

        </>
    )
}