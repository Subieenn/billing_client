import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Tabbar from "../../components/tabbar/Tabbar";
import { OrderContext } from "../../context/api/OrderContext";
import { AuthContext } from "../../context/AuthContext";
import GetOneOrder from '../../components/modals/GetOneOrder'
import moment from "moment";
import _ from "lodash";
import SalesChart from "../../components/chart/SalesChart";

export default function Dashboard() {
    const state = {
        curDT: new Date().toLocaleString(),
    }
    const { user } = useContext(AuthContext)
    const { ordersData, FetchOrdersData, FetchOrdersDataByDates, ordersAfterDates } = useContext(OrderContext)
    const navigate = useNavigate();



    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // const getOrdersByDates = () => {

    // }

    useEffect(() => {
        if (user?.isAdmin) {
            navigate("/dashboard");
            // FetchOrdersData()
        } else {
            navigate("/login")
        }
    }, [])

    useEffect(() => {
        FetchOrdersDataByDates(fromDate, toDate)
    }, [fromDate, toDate])

    const totalQuantityInArray = ordersAfterDates?.map((data) => {
        return data.orders
    })

    const totalQuantity = _.flatten(totalQuantityInArray).map((amount) => {
        return Number(amount.quantity)
    })

    const totalAmount = ordersAfterDates?.map((data) => {
        return Number(data.totalPrice)
    })




    return (
        <>

            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-md-100">
                        <Tabbar dashboard="active" />
                    </div>

                    <div className="col-md-10 h-100">
                        <div className="dashboard overflow-auto scrollbar h-100">
                            <div>
                                <h3 className="fw-600">Sales Dashboard</h3>
                                <p className="text-info">{state.curDT} </p>
                                <hr />
                            </div>
                            <div className="revenue d-flex gap-md-5 gap-4 position-relative">
                                <div className="box">
                                    <div className="d-flex align-items-center">
                                        <img className="dollar" src="https://cdn.asparksys.com/medias/1674194108443.png" alt="coin" />


                                    </div>
                                    <p className="revenue-number"> Nrs.<span>{_.sum(totalAmount)}</span></p>
                                    <p className="revenue">Total Revenue</p>
                                </div>

                                <div className="box">
                                    <div className="d-flex align-items-center">
                                        <img className="dollar" src="https://cdn.asparksys.com/medias/1674194393544.png" alt="coin" />


                                    </div>
                                    <p className="revenue-number"><span>{_.sum(totalQuantity)}</span></p>
                                    <p className="revenue">Total Dish Ordered</p>
                                </div>

                                <div className="ms-md-auto d-flex flex-md-row flex-column">
                                    <div className="me-4">
                                        <h6>From</h6>
                                        <input className="form-control" type="date" onChange={e => setFromDate(e.target.value)} />
                                    </div>

                                    <div>
                                        <h6>To</h6>
                                        <input className="form-control" type="date" onChange={e => setToDate(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {/* Chart */}

                            <div className="my-4 sales-report">
                                <h4>Sales Report</h4>
                            <SalesChart ordersAfterDates={ordersAfterDates}/>
                            </div>

                            {/* Order Report */}
                            <div className="order-report">
                                <div className="d-flex justify-content-between">
                                    <h3 className="fw-500 fs-24">Order Report</h3>

                                    {/* <button className="btn btn-outline-dark"><i class="fa-solid fa-filter me-1"></i>Filter Order</button> */}
                                </div>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Order Id</th>
                                            <th scope="col">Menu</th>
                                            <th scope="col">Total Payment</th>
                                            <th scope="col">Time</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ordersAfterDates.map((order) => (
                                            <tr key={order._id}>
                                                <th scope="row">{order.orderId}</th>
                                                <td>{order.orders === undefined || order.orders.length === 0 ? "" : order.orders[0].productsName}...</td>
                                                <td>Nrs {order.totalPrice}</td>
                                                <td>{moment(order.updatedAt).format("MMM Do, h:mm a")}</td>
                                                <td><Link to={`/dashboard/edit/${order._id}`}><i className="fi fa-regular fa-pen-to-square " /></Link></td>
                                                <td><Link to={`/dashboard/get/${order._id}`}><i className="fi fa-regular fa-eye " /></Link></td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />

        </>
    )
}