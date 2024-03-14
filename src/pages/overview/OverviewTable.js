import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tabbar from "../../components/tabbar/Tabbar";
import { RoomContext } from "../../context/api/RoomContext";
import { TableContext } from "../../context/api/TableContext";
import { AuthContext } from "../../context/AuthContext";

export default function Overview() {
    const { user } = useContext(AuthContext)
    const { FetchTablesData, tablesData } = useContext(TableContext)
    const {FetchRoomData}= useContext(RoomContext)

    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/");
            FetchTablesData()
            FetchRoomData()
        } else {
            navigate("/login")
        }
    }, [user])

    return (
        <>
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-md-100 tab-side">
                        <Tabbar overview="active" />
                    </div>

                    <div className="col-md-10 h-100 overflow-auto scrollbar table-side">
                        <h3 className="fw-600">All Tables</h3>
                        <p className="fw-400 fs-18">Choose a table to start a order</p>
                        <hr />
                        <h1 className="fs-24">Tables</h1>
                        <div className="tables-list">
                            {tablesData?.filter(item => item.type === 'table').map(table => {
                                return (
                                    <div className="table text-center p-3 border rounded-3">
                                        <Link to={`/pos/${table._id}`}>
                                            <h2>{table.tableNo}</h2>
                                            <h6 className="fw-500 fs-16" style={{ color: table?.tableOrders?.length === 0 ? 'red' : '#54B435' }}>{table?.tableOrders?.length === 0 ? "Inactive" : "Active"}</h6>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>

                        <h1 className="fs-24">Rooms</h1>
                        <div className="tables-list">
                            {tablesData?.filter(item => item.type === 'room').map(table => {
                                return (
                                    <div className="table text-center p-3 border rounded-3">
                                        <Link to={`/pos/${table._id}`}>
                                            <h2>{table.tableNo}</h2>
                                            <h6 className="fw-500 fs-16" style={{ color: table?.tableOrders?.length === 0 ? 'red' : '#54B435' }}>{table?.tableOrders?.length === 0 ? "Inactive" : "Active"}</h6>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}